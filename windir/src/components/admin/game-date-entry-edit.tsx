import { getLongDay } from "@/util/games";
import { AdminPanelGame, Game } from "@/util/types";
import { MouseEvent, useCallback, useRef } from "react";
import classes from './games.module.css';

const days: string[] = [];
for (let i = 0; i < 7; i++) {
    days.push(getLongDay(i));
}

export default function GameDateEntryForm({game, toggleForm, handleSubmit}: {
    game?: AdminPanelGame,
    toggleForm: () => void,
    handleSubmit: (data: AdminPanelGame) => void
}) {

    const selectRef = useRef<HTMLSelectElement>(null);
    const hoursRef = useRef<HTMLSelectElement>(null);
    const minutesRef = useRef<HTMLSelectElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const makeHours = useCallback(() => {
        const hours: string[] = [];
        for (let i = 0; i < 24; i++) {
            hours.push(i < 10 ? '0' + i : i + '')
        }
        return hours.map(hour => <option key={hour}>{hour}</option>)
    }, []);
    const makeMinutes = useCallback(() => {
        const minutes: string[] = [];
        for (let i = 0; i < 60; i++) {
            minutes.push(i < 10 ? '0' + i : i+'');
        }
        return minutes.map(minute => <option key={minute}>{minute}</option>)
    }, []);

    const submitForm = useCallback(() => {
        if (selectRef.current && hoursRef.current && minutesRef.current && imageRef.current) {
            
            const data: AdminPanelGame = {
                id: game? game.id : '',
                day: +selectRef.current.value,
                time: `${hoursRef.current.value}:${minutesRef.current.value}`,
                image: imageRef.current.value.trim()
            };

            handleSubmit(data);
        }
    }, [selectRef, hoursRef, minutesRef, imageRef, handleSubmit]);

    return <div className={classes.form}>
        <div className={classes['form-cont']}>
            <select className={`input ${classes.input}`} ref={selectRef} defaultValue={game ? game.day : 0}>
                {days.map((day, i) => <option key={day} value={i}>{day}</option>)}
            </select>
        </div>
        <div className={classes['time-cont']}>
            <select className="input" ref={hoursRef} defaultValue={game ? game.time.slice(0, 2) : '00'}>
                {makeHours()}
            </select>:
            <select className="input" ref={minutesRef} defaultValue={game ? game.time.slice(3) : '00'}>
                {makeMinutes()}
            </select>
        </div>
        <div className={classes['form-cont']}>
            <input className={`input ${classes.input}`} ref={imageRef} type="text" defaultValue={game ? game.image : '/images/sg-img.png'} />
        </div>
        <div>
            <button type="button" className="btn btn-dark" onClick={submitForm}>Сохранить</button>
            <button type="button" className="btn btn-dark" onClick={toggleForm}>Отменить</button>
        </div>
    </div>
}