'use client';

import { FormEventHandler, useCallback, useContext, useRef } from 'react';
import classes from '../form.module.css';
import UserContext from '@/context/user-context';

function SingInForm() {
    const nameRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const {signIn} = useContext(UserContext);

    const handleSubmit: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        const name = nameRef.current!.value;
        const pwd = passRef.current!.value;

        if (!name) nameRef.current!.focus();
        else if (!pwd) passRef.current!.focus();
        else {
            signIn(name, pwd)
        }
    }, [nameRef, passRef]);

    return (<form onSubmit={handleSubmit}>
        <input ref={nameRef} className={classes.input} type="text" placeholder='Логин'/>
        <input ref={passRef} className={classes.input} type='password' placeholder='Пароль' />
        <button className="btn">Войти</button>
    </form>)
}

export default SingInForm;