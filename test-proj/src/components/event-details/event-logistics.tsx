import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import classes from './event-logistics.module.css';
import { EventInfo } from '@/util/types';
import Image from 'next/image';

function EventLogistics({event}: {event: EventInfo}) {
  const date = new Date(event.date);

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={event.image} width={400} height={400} alt={event.title}/>
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{date.toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'})}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{event.address}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
