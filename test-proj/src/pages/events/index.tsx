import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { fetchEvents } from "@/data/dataService";
import { EventInfo } from "@/util/types";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";

function EventsIndexPage({events, error}: {events: EventInfo[], error: string}) {
    const router = useRouter();

    const handleSearch = useCallback((year: string, month: string) => router.push(`/events/${year}/${month}`), [router]);

    return (
        <>
            <EventsSearch onSearch={handleSearch}/>
            {error && <>
                    <ErrorAlert>Failed to load events</ErrorAlert>
                    <div className="center"><Button href="./">Try again</Button></div>
                </>
            }
            <EventList events={events} />
        </>
    )
}

export const getStaticProps: GetStaticProps<{error: string, events: EventInfo[]}> = async() => {
    const res = await fetchEvents();
    return {
        props: {
            error: res.error,
            events: res.data,
        }
    }
}

export default EventsIndexPage;