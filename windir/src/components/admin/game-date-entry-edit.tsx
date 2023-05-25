import { getLongDay } from "@/util/games";
import { Game } from "@/util/types";
import { MouseEvent, useCallback, useRef } from "react";
import classes from './games.module.css';

const days: string[] = [];
for (let i = 0; i < 7; i++) {
    days.push(getLongDay(i));
}

export default function GameDateEntryForm({game, toggleForm, handleSubmit}: {
    game?: Game,
    toggleForm: () => void,
    handleSubmit: (btn: HTMLButtonElement, data: Game) => void
}) {

    const selectRef = useRef<HTMLSelectElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const submitForm = useCallback((e: MouseEvent) => {
        if (selectRef.current && timeRef.current && imageRef.current) {
            if (!timeRef.current.value.trim()) {
                timeRef.current.focus();
                return;
            }
            
            const data: Game = {
                id: game? game.id : '',
                day: +selectRef.current.value,
                time: timeRef.current.value.trim(),
                image: imageRef.current.value.trim()
            };

            handleSubmit((e.target as HTMLButtonElement), data);
        }
    }, [selectRef, timeRef, imageRef, handleSubmit]);

    return <div className={classes.form}>
        <div className={classes['form-cont']}>
            <select className={`input ${classes.input}`} ref={selectRef} defaultValue={game ? game.day : 0}>
                {days.map((day, i) => <option key={day} value={i}>{day}</option>)}
            </select>
        </div>
        <div className={classes['form-cont']}>
            <input className={`input ${classes.input}`} ref={timeRef} type="text" defaultValue={game? game.time: '21:00'} />
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