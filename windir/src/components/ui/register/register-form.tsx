'use client';

import { FormEventHandler, useCallback, useRef, useState } from 'react';
import classes from './register-form.module.css';
import specs from '@/util/specs';
import projects from '@/util/projects';
import Link from 'next/link';

export default function RegisterForm() {

const [extraProjectVisible, setExtraProjectVisible] = useState(false);
const [formError, setFormError] = useState('');
const [hasTelegram, setHasTelegram] = useState(false);

const formRef = useRef<HTMLFormElement>(null);

const checkLoginFormat: FormEventHandler = useCallback(() => {}, []);
const handleHasTelegram = useCallback(() => setHasTelegram(prev => !prev), [setHasTelegram]);
const checkPasswordMatch = useCallback(() => {}, []);
const addExtraProject = useCallback(() => setExtraProjectVisible(prev => !prev), [setExtraProjectVisible]);
const submitHandler: FormEventHandler = useCallback(e => {}, [formRef]); 


return <>
    <h1>Заявка в отряд</h1>
    <form className={classes.form} autoComplete="off" ref={formRef} onSubmit={submitHandler}>
        <p className="error-text">{formError}</p>

        <div className={classes.control}>
            <label htmlFor="username">Позывной</label>
            <input className={classes.input} type="text" id="username" name="username" maxLength={15} onChange={checkLoginFormat} required />
            <span className="error-text"></span>
        </div>

        <div className={classes.control}>
            <label htmlFor="reg-password">Пароль</label>
            <input className={classes.input} type="password" id="reg-password" name="password1" required />
            <span className="error-text"></span>
        </div>

        <div className={classes.control}>
            <label htmlFor="confirm">Подтверждение пароля</label>
            <input className={classes.input} type="password" id="confirm" name="password2" 
            onBlur={checkPasswordMatch} />
            <span className="error-text"></span>
        </div>

        <hr className={classes.hr}/>

        <div className={classes.control}>
            <label htmlFor="dob">Дата рождения</label>
            <input className={classes.input} id="dob" name="dob" type="date" required />
            <span className="error-text"></span>
        </div>

        <div className={classes.switch}>
            <label htmlFor='telegram'>Есть в Telegram</label>
            <input type="checkbox" id="telegram" name="telegram" checked={hasTelegram} onChange={handleHasTelegram}/>
            <div className={classes.slider} onClick={handleHasTelegram}>
                <span></span>
            </div>
        </div>

        <div className={classes.control}>
            <label htmlFor="contact" id="contact-label">{hasTelegram ? 'Telegram' : 'Электронная почта'}</label>
            <input className={classes.input} type={hasTelegram ? 'text' : 'email'} id="contact" maxLength={30} name="contact" required />
            <span className="error-text"></span>
        </div>

        <div className={classes.control}>
            <label htmlFor="UTC">Часовой пояс</label>
            <select className={classes.input} id="utc" name="utc"></select>
        </div>

        <hr className={classes.hr}/>

        <div className={classes.control}>
            <label htmlFor="hours">Количество наигранных часов</label>
            <input className={classes.input} type="number" id="hours" name="hours" min={1} required />
            <span className="error-text"></span>
        </div>

        <div className={classes.checkscontrol}>
            <label>Предпочитаемая специализация</label>
            <div className={classes.checks}>
                {specs.map((spec, i) => <label key={i}>
                    <input type="checkbox" name="spec" value={i} />{ spec }
                </label>)}
            </div>
        </div>

        <div className={classes.checkscontrol}>
            <label>Проекты, на которых вы играли</label>
            <div className={classes.checks}>
                {Object.entries(projects).map(([id, project]) => <label key={id}>
                    <input type="checkbox" name="project" value={id} />{ project }
                </label>)}
                <label>
                    <input type="checkbox" name="project-other" onClick={addExtraProject} /> Другие
                </label>
                <textarea className={classes.textarea} name="other" placeholder="Перечислите другие" disabled={!extraProjectVisible} />
            </div>
        </div>

        <div className={classes.checkscontrol}>
            <label htmlFor="teams">Отряды, в которых вы состояли</label>
            <textarea className={classes.textarea} id="teams" name="teams" />
        </div>

        <button className={`btn ${classes.btn}`}>Отправить заявку</button>

        <p className="sm c">
            Нажимая "Отправить", вы подтверждаете, что ознакомились с 
            <Link href="/about"> информацией об отряде и его правилами</Link>
        </p>
    </form>
</>
}