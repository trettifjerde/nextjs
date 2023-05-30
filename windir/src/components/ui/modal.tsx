import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import classes from './modal.module.css';
import { MouseEvent, ReactNode } from 'react';
import fonts from '@/styles/fonts.module.css';

export default function Modal({visible, toggleModal, children, clName}: {
    visible: boolean, toggleModal: () => void, children: ReactNode, clName?: string
}) {
    if (typeof window !== 'undefined')
        return createPortal(<CSSTransition in={visible} timeout={300} classNames="fade" mountOnEnter unmountOnExit>
            <div className={`${classes.modal} ${fonts.oswald} ${clName ? classes[clName] : ''}`}>
                <div className={`${classes.inner} slide-down`}>
                    <div><button type='button' className='btn' onClick={toggleModal}>X</button></div>
                    {children}
                </div>
                <div className={classes['modal-shadow']} onClick={toggleModal}/>
            </div>
        </CSSTransition>, document.getElementById('modal')!);
    else 
        return <></>
}