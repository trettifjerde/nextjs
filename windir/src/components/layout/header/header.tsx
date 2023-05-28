import classes from './header.module.css';
import Logo from './components/logo';
import SingInForm from './components/sign-in-form';
import UserMenu from './components/user-menu';
import { useSession } from 'next-auth/react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import fonts from '@/styles/fonts.module.css';

function WindirHeader({error}: {error: string}) {
    const {status} = useSession();

    if (error) {
        return (<header className={classes.header}>
            <div className={fonts.norse}>{error}</div>
            <div>{error === '404' ? 'Страница не найдена или находится в разработке' : 'Ошибка на сервере'}</div>
        </header>)
    }
    else
        return (<header className={`${classes.header} ${fonts.oswald}`}>
            <Logo />
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