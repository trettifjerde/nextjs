import EventList from "@/components/events/EventList";
import { DUMMY_EVENTS } from "@/data/dummy_events";
function IndexPage() {
    const events = DUMMY_EVENTS.filter(event => event.featured);
    return (
        <EventList events={events}/>
    )
}

export default IndexPage;