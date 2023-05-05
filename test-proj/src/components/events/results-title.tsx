import Button from '../ui/button';
import classes from './results-title.module.css';

function ResultsTitle({date}: {date: Date}) {

  const humanReadableDate = date.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button href='/events'>Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
