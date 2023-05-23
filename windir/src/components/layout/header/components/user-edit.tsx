import { FormEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import classes from './form.module.css';
import { useSession } from 'next-auth/react';
import { createPortal } from 'react-dom';
import { fetchData } from '@/util/fetch';

const zones = Intl.supportedValuesOf('timeZone');
type ResStatus = {text: string, clName: 'pending' | 'error-text' | 'ok-text'};

export default function UserEditForm({toggleEdit}: {toggleEdit: () => void}) {

    const {data: session, update} = useSession();

    const oldPwd = useRef<HTMLInputElement>(null);
    const newPwd = useRef<HTMLInputElement>(null);
    const newPwd2 = useRef<HTMLInputElement>(null);
    const [passRes, setPassRes] = useState<ResStatus>({text: '', clName: 'ok-text'});

    const nameRef = useRef<HTMLInputElement>(null);
    const [nameRes, setNameRes] = useState<ResStatus>({text: '...', clName: 'pending'});

    const zoneRef = useRef<HTMLSelectElement>(null);
    const [zoneRes, setZoneRes] = useState<ResStatus>({text: '', clName: 'ok-text'});


    const handlePasswordSubmit: FormEventHandler = useCallback(async(e) => {
        e.preventDefault();
        const btn = (e.target as HTMLFormElement).querySelector('button')!;

        btn.disabled = true;
        
        const old = oldPwd.current!.value;
        const newP = newPwd.current!.value;
        const newP2 = newPwd2.current!.value;
        
        if (!old) oldPwd.current!.focus()
        else if (!newP) newPwd.current!.focus();
        else if (!newP2) newPwd2.current!.focus();
        else if (newP !== newP2) setPassRes({text: 'Пароли не совпадают', clName: 'error-text'});
        else {
            setPassRes({text: 'Идет запрос...', clName: 'pending'});
            const res = await fetchData('/api/reset', {password: newP, oldPassword: old});
            if (res.ok) {
                setPassRes({text: 'Пароль успешно изменен', clName: 'ok-text'});
                oldPwd.current!.value = '';
                newPwd.current!.value = '';
                newPwd2.current!.value = '';
            }
            else {
                const {error} = await res.json();
                setPassRes({text: error, clName: 'error-text'});
            }
        }
        btn.disabled = false;

    }, [oldPwd, newPwd, newPwd2, setPassRes]);

    const handleTimeZone: FormEventHandler = useCallback(async(e) => {
        e.preventDefault();
        const btn = (e.target as HTMLFormElement).querySelector('button')!;

        setZoneRes({text: 'Идет запрос...', clName: 'pending'});
        btn.disabled = true;

        const zone = zoneRef.current!.value;

        const res = await fetchData('/api/zone', {utc: zone})
        if (res.ok) {
            setZoneRes({text: 'Часовой пояс изменен', clName: 'ok-text'});
            update({utc: zone});
        }
        else {
            const {error} = await res.json();
            setZoneRes({text: error, clName: 'error-text'});
        }
        btn.disabled = false;

    }, [zoneRef, setZoneRes]);

    const handleUsernameSubmit: FormEventHandler = useCallback(async(e) => {
        e.preventDefault();

        const btn = (e.target as HTMLFormElement).querySelector('button')!;
        btn.disabled = true;
        
        const username = nameRef.current!.value.trim();
        if (!username) {
            nameRef.current!.focus();
            return;
        }
        else if (username === session?.user?.username) {
            setNameRes({text: 'Новый позывной соответствует текущему', clName: 'error-text'});
        }
        else {
            setNameRes({text: 'Идет запрос...', clName: 'pending'});
            const res = await fetchData('/api/username', {username});
            if (res.ok) setNameRes({text: 'Запрос на смену позывного отправлен', clName: 'ok-text'});
            else {
                const {error} = await res.json();
                setNameRes({text: error, clName: 'error-text'});
            }
        }
        btn.disabled = false;
    }, [nameRef, setNameRes]);

    useEffect(() => {
        async function checkNameStatus() {
            const res = await fetchData('/api/username');
            if (res.ok) {
                const {name} = await res.json();
                if (name)
                    setNameRes({text: `Новый позывной ${name} на рассмотрении`, clName: 'pending'});
                else 
                    setNameRes({text: '', clName: 'ok-text'});
            }
            else {
                setNameRes({text: 'Ошибка при проверке статуса. Закройте и откройте модальное окно', clName: 'error-text'});
            }
        }
        checkNameStatus();
    }, [setNameRes]);

    return createPortal(<div className={classes.modal}>
        <div className={`${classes.inner} slide-down`}>
            <button type='button' className='btn' onClick={toggleEdit}>X</button>
            <form onSubmit={handleUsernameSubmit}>
                <div className={classes.head}>
                    <div>Позывной</div>
                    <p className={classes[nameRes.clName]}>{nameRes.text}</p>
                </div>
                <input type="text" ref={nameRef} className={classes.input} defaultValue={session?.user?.username} />
                <div className='center'>
                    <button className="btn">Сменить</button>
                </div>
            </form>
            <form onSubmit={handlePasswordSubmit}>
                <div className={classes.head}>
                    <div>Пароль</div>
                    <p className={classes[passRes.clName]}>{passRes.text}</p>
                </div>
                <input ref={oldPwd} className={classes.input} type="password" placeholder="Текущий пароль" />
                <input ref={newPwd} className={classes.input} type="password" placeholder="Новый пароль" />
                <input ref={newPwd2} className={classes.input} type="password" placeholder="Повторите новый пароль" />
                <div className='center'>
                    <button className='btn'>Сменить</button>
                </div>
            </form>
            <form onSubmit={handleTimeZone}>
                <div className={classes.head}>
                    <div>Часовой пояс</div>
                    <p className={classes[zoneRes.clName]}>{zoneRes.text}</p>
                </div>
                <select ref={zoneRef} className={classes.input} defaultValue={session?.user?.utc}>
                    {zones.map(zone => <option key={zone}>{zone}</option>)}
                </select>
                <div className='center'>
                    <button className='btn'>Сменить</button>
                </div>
            </form>
        </div>
        <div className={classes['modal-shadow']} onClick={toggleEdit}/>
    </div>, document.getElementById('modal')!);
}