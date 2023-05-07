import EventList from "@/components/events/EventList";
import NewsletterRegistration from "@/components/input/newsletter-generation";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { fetchEvents } from "@/data/dataService";
import { EventInfo } from "@/util/types";
import { GetStaticProps } from "next";
function IndexPage({events, error}: {events: EventInfo[], error: string}) {
    if (events)
        return (
            <>
                {error && <>
                    <ErrorAlert>Failed to load events</ErrorAlert>
                        <div className="center"><Button href="./">Try again</Button></div>
                    </>
                }
                <NewsletterRegistration />
                <EventList events={events} />
            </>
        )
    else 
        return <p>Loading...</p>
}

export const getStaticProps : GetStaticProps<{events: EventInfo[], error: string}> = async() => {
    const res = await fetchEvents();
    return {
        props: {
            events: res.data.filter(event => event.featured),
            error: res.error
        }
    }

}

export default IndexPage;