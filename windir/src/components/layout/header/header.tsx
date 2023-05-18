import classes from './header.module.css';
import Logo from './components/logo';
import SingInForm from './components/sign-in-form';
import UserMenu from './components/user-menu';
import { useSession } from 'next-auth/react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function WindirHeader() {
    const {status} = useSession();

    return (<header className={classes.header}>
        <Logo clName={classes.logo} />
        <SwitchTransition mode='out-in'>
            <CSSTransition key={status} timeout={300} classNames='fade' >   
                <div>
                    {status === 'authenticated' && <UserMenu/>}
                    {status === 'unauthenticated' && <SingInForm />}
                </div>
            </CSSTransition>

        </SwitchTransition>

    </header>)
}
export default WindirHeader