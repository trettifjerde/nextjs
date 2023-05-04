import EventList from "@/components/events/EventList";
import { DUMMY_EVENTS } from "@/data/dummy_events";
function IndexPage() {
    const events = DUMMY_EVENTS.filter(event => event.featured);
    return (
        <>
            <h1>Featured Events</h1>
            <EventList events={events}/>
        </>
    )
}

export default IndexPage;