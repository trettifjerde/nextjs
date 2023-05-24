import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import classes from './modal.module.css';
import { MouseEvent, ReactNode } from 'react';

export default function Modal({visible, toggleModal, children, modalId, clName}: {
    visible: boolean, toggleModal: (e: MouseEvent) => void, children: ReactNode, modalId: string, clName?: string
}) {
    if (typeof window !== 'undefined')
        return createPortal(<CSSTransition in={visible} timeout={300} classNames="fade" mountOnEnter unmountOnExit>
            <div className={`${classes.modal} ${clName ? classes[clName] : ''}`}>
                <div className={`${classes.inner} slide-down`}>
                    <div><button type='button' className='btn' onClick={toggleModal}>X</button></div>
                    {children}
                </div>
                <div className={classes['modal-shadow']} onClick={toggleModal}/>
            </div>
        </CSSTransition>, document.getElementById(modalId)!);
    else 
        return <></>
}