import EventComponent from "@/components/events/EvenItem";
import { DUMMY_EVENTS } from "@/data/dummy_events";
import { useRouter } from "next/router";

function EventPage() {
    const router = useRouter();
    console.log(router);
    if ('eventId' in router.query) {
        const event = DUMMY_EVENTS.find(event => event.id === router.query.eventId);
        if (event)
            return <EventComponent event={event} />
    }
    router.push('/');
    return <></>
}

export default EventPage;