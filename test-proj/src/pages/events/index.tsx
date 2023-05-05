import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { DUMMY_EVENTS } from "@/data/dummy_events";
import { useRouter } from "next/router";
import { useCallback } from "react";

function EventsIndexPage() {
    const router = useRouter();
    const events = DUMMY_EVENTS;

    const handleSearch = useCallback((year: string, month: string) => router.push(`/events/${year}/${month}`), [router]);

    return (
        <>
            <EventsSearch onSearch={handleSearch}/>
            <EventList events={events} />
        </>
    )
}

export default EventsIndexPage;