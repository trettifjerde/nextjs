import { ReactNode, useCallback, useState } from "react";
import classes from './spoiler.module.css';
import { CSSTransition } from "react-transition-group";

export default function Spoiler({header, children, initial}: {header: string, children: ReactNode, initial: boolean}) {
    const [open, setOpen] = useState(initial);

    const toggleSpoiler = useCallback(() => setOpen(prev => !prev), [setOpen]);

    return (
        <div className={`${classes.cont} ${open ? classes.open : ''}`}>
            <div className={classes.header} onClick={toggleSpoiler}>
                <h2>{header}</h2>
                <span>t</span>
            </div>
            <div className={classes.body}>
                <CSSTransition in={open} timeout={300} classNames="spoiler" appear={initial}>
                    <div className={`${classes.inner}`}>
                        {children}
                    </div>
                </CSSTransition>
            </div>
        </div>
    )
}