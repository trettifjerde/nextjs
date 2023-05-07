import { FormEventHandler, useRef } from 'react';
import classes from './newsletter-generation.module.css';
import { registerEmailSubscription } from '@/data/dataService';

function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement>(null);

  const registrationHandler: FormEventHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current!.value.trim();

    if (email) {
      const res = await registerEmailSubscription(email);
      if (res.error) {
        console.log(res.error);
      }
      else {
        console.log(`Email registered. Id: ${res.data}`);
        emailRef.current!.value = '';
      }
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