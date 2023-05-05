import EventContent from "@/components/event-details/event-content";
import EventLogistics from "@/components/event-details/event-logistics";
import EventSummary from "@/components/event-details/event-summary";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById } from "@/data/dummy_events";
import { useRouter } from "next/router";

function EventPage() {
    const router = useRouter();
    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if (!event) {
        return <>
            <ErrorAlert>No event found</ErrorAlert>
            <div className="center"><Button href="/events">Back to all events</Button></div>
        </>
    }
    else {

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
}

export default EventPage;