import { FormEventHandler, useRef } from 'react';
import classes from './newsletter-generation.module.css';

function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement>(null);

  const registrationHandler: FormEventHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current!.value.trim();

    if (email) {
      fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: {'Content-Type': 'application/json'}
      })
      .then(r => r.json())
      .then(({message}) => console.log(message))
      .catch(err => console.log(err))
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;