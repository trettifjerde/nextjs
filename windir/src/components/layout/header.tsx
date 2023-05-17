import classes from './header.module.css';
import Logo from '../ui/logo';
import SingInForm from './header/sign-in-form';
import UserMenu from './header/user-menu';
import { useSession } from 'next-auth/react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function WindirHeader() {
    const {data: session} = useSession();

    return (<header className={classes.header}>
        <Logo clName={classes.logo} />
        <SwitchTransition mode='out-in'>
            <CSSTransition key={session ? 'authed' : 'unathed'} timeout={300} classNames='fade' >   
                <div>
                    {session && <UserMenu/>}
                    {!session && <SingInForm />}
                </div>
            </CSSTransition>

        </SwitchTransition>

    </header>)
}
export default WindirHeader