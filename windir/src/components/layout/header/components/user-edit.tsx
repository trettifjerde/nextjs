import { FormEventHandler, useCallback, useRef, useState } from 'react';
import classes from './form.module.css';
import { useSession } from 'next-auth/react';

const zones = Intl.supportedValuesOf('timeZone');

export default function UserEditForm({toggleEdit}: {toggleEdit: () => void}) {

    const {data: session} = useSession();

    const oldPwd = useRef<HTMLInputElement>(null);
    const newPwd = useRef<HTMLInputElement>(null);
    const newPwd2 = useRef<HTMLInputElement>(null);
    const [passError, setPassError] = useState('');

    const zoneRef = useRef<HTMLSelectElement>(null);


    const handlePasswordSubmit: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        const old = oldPwd.current!.value;
        const newP = newPwd.current!.value;
        const newP2 = newPwd2.current!.value;

        if (!old) oldPwd.current!.focus()
        else if (!newP) newPwd.current!.focus();
        else if (!newP2) newPwd2.current!.focus();
        else if (newP !== newP2) {
            setPassError('Пароли не совпадают');
        }
    }, [oldPwd, newPwd, newPwd2, setPassError]);

    const handleTimeZone: FormEventHandler = useCallback((e) => {}, []);

    const handleUsernameSubmit: FormEventHandler = useCallback((e) => {}, []);

    return(<div className={classes.modal}>
        <button type='button' className='btn' onClick={toggleEdit}>Закрыть</button>
        <div className={classes.div}>
            <form onSubmit={handleUsernameSubmit}>
                <div>Позывной</div>
                <input type="text" className={classes.input} defaultValue={session?.user?.username} />
                <div>
                    <button className="btn">Сменить</button>
                </div>
            </form>
            <form onSubmit={handlePasswordSubmit}>
                <div>Пароль</div>
                <p className={classes.error}>{passError}</p>
                <input ref={oldPwd} className={classes.input} type="password" placeholder="Текущий пароль" />
                <input ref={newPwd} className={classes.input} type="password" placeholder="Новый пароль" />
                <input ref={newPwd2} className={classes.input} type="password" placeholder="Повторите новый пароль" />
                <div>
                    <button className='btn'>Сменить</button>
                </div>
            </form>
            <form onSubmit={handleTimeZone}>
                <div>Часовой пояс</div>
                <select ref={zoneRef} className={classes.input} defaultValue={session?.user?.utc}>
                    {zones.map(zone => <option key={zone}>{zone}</option>)}
                </select>
                <div>
                    <button className='btn'>Сменить</button>
                </div>
            </form>
            </div>
        </div>)
}