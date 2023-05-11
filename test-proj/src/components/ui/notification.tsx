import { Notification } from '@/util/types';
import classes from './notification.module.css';

function Notification({notification, hideHandler}: {notification: Notification, hideHandler: () => void}) {
    const {title, message, status} = notification;

    const activeClasses = `${classes.notification} ${status === 'success' ? classes.success : status === 'pending' ? classes.pending : classes.error}`
    return (
        <div className={activeClasses} onClick={hideHandler}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    )
}
export default Notification;