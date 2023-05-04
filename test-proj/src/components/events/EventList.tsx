import { EventInfo } from '@/util/types';
import classes from './event-list.module.css';
import EventItem from './EvenItem';

function EventList({events}: {events: EventInfo[]}) {
    return (
        <ul className={classes.list}>
            {events.map(event => <EventItem key={event.id} event={event}/>)}
        </ul>
    )
}
export default EventList;