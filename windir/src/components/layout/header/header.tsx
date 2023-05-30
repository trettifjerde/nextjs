import classes from './header.module.css';
import Logo from './components/logo';
import SingInForm from './components/sign-in-form';
import UserMenu from './components/user-menu';
import { useSession } from 'next-auth/react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import fonts from '@/styles/fonts.module.css';
import { useCallback, useEffect, useState } from 'react';

function WindirHeader({error}: {error: string}) {
    
    if (error) {
        return (<header className={classes.header}>
            <div className={fonts.norse}>{error}</div>
            <div>{error === '404' ? 'Страница не найдена или находится в разработке' : 'Ошибка на сервере'}</div>
        </header>)
    }

    const {status} = useSession();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, [setIsClient]);

    return (<header className={`${classes.header} ${fonts.oswald}`}>
        <Logo />
        {isClient && <SwitchTransition mode='out-in'>
            <CSSTransition key={status} timeout={300} classNames='fade' >   
                <>
                    {status === 'authenticated' && <UserMenu/>}
                    {status === 'unauthenticated' && <SingInForm invis={false} />}
                </>
            </CSSTransition>
        </SwitchTransition>}
        {!isClient && <SingInForm invis={true} />}

    </header>)
}
export default WindirHeader