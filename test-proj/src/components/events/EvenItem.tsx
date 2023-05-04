import { EventInfo } from "@/util/types";
import classes from './event-item.module.css';
import Link from "next/link";
import Button from "../ui/button";


function EventItem({event}: {event: EventInfo}) {
    return (
        <li className={classes.item}>
            <img />
            <div className={classes.content}>
                <h2>{event.title}</h2>
                <div className={classes.date}>
                    <time>{event.date.toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})}</time>
                </div>
                <div className={classes.actions}>
                    <Button href={`/events/${event.id}`}>Explore event</Button>
                </div>
            </div>
        </li>
    )
}
export default EventItem;