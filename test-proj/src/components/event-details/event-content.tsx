import { ReactNode } from 'react';
import classes from './event-content.module.css';

function EventContent({children}: {children: ReactNode}) {
  return (
    <section className={classes.content}>
      {children}
    </section>
  );
}

export default EventContent;
