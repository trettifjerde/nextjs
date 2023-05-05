import { ReactNode } from 'react';
import classes from './error-alert.module.css';

function ErrorAlert({children}: {children: ReactNode}) {
  return <div className={classes.alert}>{children}</div>;
}

export default ErrorAlert;
