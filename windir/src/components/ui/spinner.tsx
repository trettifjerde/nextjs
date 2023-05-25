import classes from './spinner.module.css';
export default function LoadingSpinner() {
    return <div className={classes.loading}>
        <div className={classes.spinner}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    </div>
}