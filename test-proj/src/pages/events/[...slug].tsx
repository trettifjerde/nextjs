import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { fetchEvents } from "@/data/dataService";
import { EventInfo } from "@/util/types";
import { GetServerSideProps } from "next";

function EventsDatePage({date, error, events}: {error: string, date: number[], events: EventInfo[]}) {

    if (error) 
        return <>
            <ErrorAlert>Invalid filter</ErrorAlert>
            <div className="center"><Button href="/events">Show all events</Button></div>
        </>

    else 
        return (
            <>
                <ResultsTitle date={new Date(date[0], date[1])} />
                {events.length > 0 ? <EventList events={events} /> : <ErrorAlert>No events found</ErrorAlert>}
            </>
        )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    const slug = context.params?.slug;
    console.log(slug);
    let props: {error: string, date: number[], events: EventInfo[]};

    if (!slug || !(slug instanceof Array) || slug.length !== 2) {
        props = {error: 'Invalid filter', date: [], events: []}
    }
    else {
        const [yearS, monthS] = slug;
        const year = +yearS;
        const month = +monthS;

        if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
            props = {error: 'Invalid filter', date: [], events: []}
        }

        else {
            const monthI = month - 1;
            const res = await fetchEvents();
            if (res.error) {
                props = {error: res.error, date: [], events: []}
            }
            else {
                const events = res.data.filter(event => {
                    const eDate = new Date(event.date);
                    return eDate.getMonth() === monthI && eDate.getFullYear() === year
                })
                props = {error: '', date: [year, monthI], events}
            }
        }
    }
    return {props};
}

export default EventsDatePage;