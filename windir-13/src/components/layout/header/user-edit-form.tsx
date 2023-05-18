import { FormEventHandler, useCallback, useRef, useState } from 'react';
import classes from '@/components/ui/form.module.css';

function UserEditForm({toggleEdit}: {toggleEdit: () => void}) {

    const oldPwd = useRef<HTMLInputElement>(null);
    const newPwd = useRef<HTMLInputElement>(null);
    const newPwd2 = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');

    const handleSubmit: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        const old = oldPwd.current!.value;
        const newP = newPwd.current!.value;
        const newP2 = newPwd2.current!.value;

        if (!old) oldPwd.current!.focus()
        else if (!newP) newPwd.current!.focus();
        else if (!newP2) newPwd2.current!.focus();
        else if (newP !== newP2) {
            setError('Пароли не совпадают');
        }
    }, [oldPwd, newPwd, newPwd2]);

    return(<form onSubmit={handleSubmit}>
        <p className={classes.error}>{error}</p>
        <input ref={oldPwd} className={classes.input} type="password" placeholder="Текущий пароль" />
        <input ref={newPwd} className={classes.input} type="password" placeholder="Новый пароль" />
        <input ref={newPwd2} className={classes.input} type="password" placeholder="Повторите новый пароль" />
        <div>
            <button className='btn'>Сменить</button>
            <button className='btn' type="button" onClick={toggleEdit}>Отмена</button>
        </div>
    </form>)
}
export default UserEditForm;