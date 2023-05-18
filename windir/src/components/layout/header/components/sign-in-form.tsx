import { FormEventHandler, useCallback, useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import classes from './form.module.css';
import MiniLoadingSpinner from '@/components/ui/mini-spinner';

function SingInForm() {
    const nameRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormEventHandler = useCallback(async(e) => {
        e.preventDefault();
        const username = nameRef.current!.value;
        const password = passRef.current!.value;

        if (!username) nameRef.current!.focus();
        else if (!password) passRef.current!.focus();
        else {
            setLoading(true);
            const result = await signIn('credentials', {redirect: false, username, password});
            if (result?.error) {
                setError(result.error);
            }
            setLoading(false);
        }
    }, [nameRef, passRef]);

    return (<div className={classes.div}>
            <form onSubmit={handleSubmit}>
                <p className={classes['error-text']}>{error}</p>
                <input ref={nameRef} className={classes.input} type="text" placeholder='Логин'/>
                <input ref={passRef} className={classes.input} type='password' placeholder='Пароль' />
                <button className="btn">Войти</button>
            </form>
            {loading && <div className={classes.shadow}>
                <MiniLoadingSpinner/>
            </div>}
        </div>)
}

export default SingInForm;