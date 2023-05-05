import EventContent from "@/components/event-details/event-content";
import EventLogistics from "@/components/event-details/event-logistics";
import EventSummary from "@/components/event-details/event-summary";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { fetchEvent, fetchEvents } from "@/data/dataService";
import { EventInfo } from "@/util/types";
import { GetStaticPaths, GetStaticProps } from "next";

function EventPage({event, error}: {event: EventInfo, error: string}) {

    if (error) {
        return <>
            <ErrorAlert>No event found</ErrorAlert>
            <div className="center"><Button href="/events">Back to all events</Button></div>
        </>
    }
    else if (event) {
        return (
            <>
                <EventSummary title={event.title} />
                <EventLogistics event={event} />
                <EventContent>
                    <p>{event.description}</p>
                </EventContent>
            </>
        )
    }
    else {
        return <p>Loading...</p>
    } 
}

export const getStaticProps : GetStaticProps<{event: EventInfo, error: string}> = async(context) => {
    const id = context.params?.eventId;

    let props: {event: EventInfo, error: string};

    if (typeof id === 'string') {
        const res = await fetchEvent(id);
        props = {
            event: res.data,
            error: res.error
        }
    }
    else {
        props = {
            event: {} as EventInfo,
            error: 'Failed to load event'
        }
    }
    return {props};
}

export const getStaticPaths : GetStaticPaths = async () => {
    const events = await fetchEvents();
    return {
        paths: events.data.map(event => ({params: {eventId: event.id}})),
        fallback: false
    }
}

export default EventPage;