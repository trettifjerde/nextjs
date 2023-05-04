import Link from 'next/link';
import classes from './button.module.css';
import { ReactNode } from 'react';

function Button({href, children}: {href: string, children: ReactNode}) {
    return <Link href={href} className={classes.btn}>{children}</Link>
}
export default Button;