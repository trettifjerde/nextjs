import { EventInfo } from "@/util/types";
import classes from './event-item.module.css';
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";


function EventItem({event}: {event: EventInfo}) {
    const date = new Date(event.date);

    return (
        <li className={classes.item}>
            <img />
            <div className={classes.content}>
                <h2>{event.title}</h2>
                <div className={classes.date}>
                    <DateIcon />
                    <time>{date.toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})}</time>
                </div>
                <div className={classes.address}>
                    <AddressIcon />
                    <address>{event.address}</address>
                </div>
                <div className={classes.actions}>
                    <Button href={`/events/${event.id}`}>
                        <span>Explore event</span>
                        <span className={classes.icon}><ArrowRightIcon/></span>
                    </Button>
                </div>
            </div>
        </li>
    )
}
export default EventItem;