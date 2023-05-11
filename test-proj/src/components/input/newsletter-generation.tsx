import { FormEventHandler, useContext, useRef } from 'react';
import classes from './newsletter-generation.module.css';
import NotificationContext from '@/store/context';

function NewsletterRegistration() {
  console.log('NewsletterRegist');
  const emailRef = useRef<HTMLInputElement>(null);
  const context = useContext(NotificationContext);
  const { showNotification } = context;

  const registrationHandler: FormEventHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current!.value.trim();

    if (email) {
      showNotification({title: 'Sending...', message: 'Subscription request is being handled', status: 'pending'});

      fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        if (res.ok) return res.json()
        else return res.json().then(data => {
            throw new Error(data.message);
          })
      })
      .then(data => showNotification({title: 'Email added!', message: data.message, status: 'success'}))
      .catch(err => showNotification({title: 'Connection error', message: err.message || 'Internet connection lost. Try again later', status: 'error'}))
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