import { FormEventHandler, useCallback, useRef, useState } from 'react';
import classes from './form.module.css';
import { useSession } from 'next-auth/react';

export default function ZonesForm({toggleEdit}: {toggleEdit: () => void}) {

    const {data: session} = useSession();
    const [error, setError] = useState('');
    const selectRef = useRef<HTMLSelectElement>(null);

    const handleSubmit: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        const zone = selectRef.current!.value;

        if (!zone) selectRef.current!.focus();

    }, [selectRef]);

    return(
        <div className={classes.div}>
            <form onSubmit={handleSubmit}>
                <p className={classes.error}>{error}</p>
                <select ref={selectRef} className={`input ${classes.input}`} defaultValue={session?.user?.utc}>
                    {Intl.supportedValuesOf('timeZone').map(zone => <option key={zone}>{zone}</option>)}
                </select>
                <div>
                    <button className='btn'>Сменить</button>
                    <button className='btn' type="button" onClick={toggleEdit}>Отмена</button>
                </div>
            </form>
        </div>)
}