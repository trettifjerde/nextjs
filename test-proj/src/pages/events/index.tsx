import EventComponent from "@/components/events/EvenItem";
import { DUMMY_EVENTS } from "@/data/dummy_events";
import { EventInfo } from "@/util/types";

function EventsIndexPage() {
    const events = DUMMY_EVENTS;
    return (
        <>
            <h1>All Events</h1>
            {events.map(event => <EventComponent key={event.id} event={event} />)}
        </>
    )
}

export default EventsIndexPage;