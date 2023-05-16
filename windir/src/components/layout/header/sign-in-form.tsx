import { FormEventHandler, useCallback, useContext, useRef, useState } from 'react';
import classes from '@/components/ui/form.module.css';
import UserContext from '@/context/user-context';
import MiniLoadingSpinner from '@/components/ui/mini-spinner';

function SingInForm() {
    const nameRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const {signIn} = useContext(UserContext);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit: FormEventHandler = useCallback(async(e) => {
        e.preventDefault();
        const name = nameRef.current!.value;
        const pwd = passRef.current!.value;

        if (!name) nameRef.current!.focus();
        else if (!pwd) passRef.current!.focus();
        else {
            setLoading(true);

            const res = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({username: name, password: pwd}),
                headers: {'Content-Type': 'application/json'}
            })
            .catch(err => {
                console.log(err);
                return new Response(JSON.stringify({error: 'Произошла ошибка. Проверьте интернет подключение и повторите позже'}), {status: 503});
            })

            const data = await res.json();

            if (res.ok) {
                signIn(name, data.token);
            }
            else {
                setError(data.error);
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