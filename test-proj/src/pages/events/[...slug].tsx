import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/data/dummy_events";
import { useRouter } from "next/router";

function EventsDatePage() {
    const router = useRouter();
    const slug = router.query.slug;

    if (!slug) 
        return <></>
    
    if (!(slug instanceof Array) || slug.length !== 2) 
        return <>
            <ErrorAlert>Invalid filter</ErrorAlert>
            <div className="center"><Button href="/events">Show all events</Button></div>
        </>

    const [yearS, monthS] = slug;
    const year = +yearS;
    const month = +monthS;

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) 
        return <>
            <ErrorAlert>Invalid filter</ErrorAlert>
            <div className="center"><Button href="/events">Show all events</Button></div>
        </>

    const filteredEvents = getFilteredEvents(+year, +month - 1);
    const date = new Date(year, month - 1);

    return (
        <>
            <ResultsTitle date={date} />
            {filteredEvents.length > 0 ? <EventList events={filteredEvents} /> : <ErrorAlert>No events found</ErrorAlert>}
        </>
    )

}

export default EventsDatePage;