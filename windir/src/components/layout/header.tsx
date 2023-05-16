'use client';

import { useContext} from 'react';
import classes from './header.module.css';
import Logo from '../ui/logo';
import UserContext from '@/context/user-context';
import SingInForm from './header/sign-in-form';
import UserMenu from './header/user-menu';

function WindirHeader() {
    const {username} = useContext(UserContext);

    return (<header className={classes.header}>
        <Logo clName={classes.logo} />
        {username && <UserMenu /> }
        {!username && <SingInForm />}
    </header>)
}
export default WindirHeader