import Link from 'next/link';
import classes from './button.module.css';
import { MouseEventHandler, ReactEventHandler, ReactNode } from 'react';

function Button({href, clickHandler, children}: {href?: string, clickHandler?: MouseEventHandler , children: ReactNode}) {
    if (href) {
        return <Link href={href} className={classes.btn}>{children}</Link>
    }
    else {
        return <button className={classes.btn} type="submit" onClick={clickHandler}>{children}</button>
    }
}
export default Button;