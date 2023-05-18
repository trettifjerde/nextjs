import { FormEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classes from './register-form.module.css';
import specs from '@/util/specs';
import projects from '@/util/projects';
import { cleanRegisterFormData } from '@/util/register';
import LoadingSpinner from '../ui/spinner';

export default function RegisterForm() {

const [extraProjectVisible, setExtraProjectVisible] = useState(false);
const [errors, setErrors] = useState<{[key: string]: string}>({});
const [hasTelegram, setHasTelegram] = useState(false);

const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const pass1Ref = useRef<HTMLInputElement>(null);
const pass2Ref = useRef<HTMLInputElement>(null);
const formRef = useRef<HTMLFormElement>(null);
const messageRef = useRef<HTMLParagraphElement>(null);

const getClassName = useCallback((error: string | undefined) => (`${classes.input} ${error ? classes.invalid : ''}`), []);

const handleHasTelegram = useCallback(() => setHasTelegram(prev => !prev), [setHasTelegram]);

const checkPasswordMatch = useCallback(() => {
    if (pass1Ref.current!.value !== pass2Ref.current!.value)
    setErrors(prev => ({...prev, password2: 'Пароли не совпадают'}))
}, [pass1Ref, pass2Ref, setErrors]);

const addExtraProject = useCallback(() => setExtraProjectVisible(prev => !prev), [setExtraProjectVisible]);

const clearError = useCallback((key: string) => {
    setError('');
    if (key in errors)
        setErrors(prev => {
            const upd = {...prev};
            delete upd[key];
            return upd;
        })
}, [errors, setErrors, setError]);

const submitHandler: FormEventHandler = useCallback(async(e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData.entries());
    const {cleanedData, errors : errs} = cleanRegisterFormData(data);

    if (Object.keys(errs).length !== 0) {
        setErrors(errs);
    }
    else {
        setLoading(true);
        const result = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(cleanedData),
            headers: {'Content-Type': 'application/json'}
        })
        .catch(err => (new Response('', {status: 404})));

        if (result.ok) {
            setLoading(false);
            setSuccess(true);
        }
        else {
            if (result.status === 422)
            {
                const errs = await result.json();
                setErrors(errs);
            }
            else if (result.status === 503 || result.status === 401) {
                const {error : err} = await result.json();
                setError(err);
            }
            else {
                setError('Произошла ошибка. Проверьте интернет соединение и повторите позже');
            }
            setLoading(false);
        }
    };
}, [formRef, setErrors]); 

const formMessageContent = useCallback(() => {
    const clName = (error || Object.keys(errors).length > 0) ? 'error-text' : 'remark'; 
    return <p ref={messageRef} className={`center ${clName}`}>{
        Object.keys(errors).length !== 0 ? 'Не все поля заполнены верно' :
        error ? error :
        'Обязательные поля отмечены жирным'}</p>
}, [errors, error]);

useEffect(() => {
    if (error) messageRef.current!.scrollIntoView({behavior: 'smooth', block: 'center'});
}, [error]);

return <>
    {!success && <div className={classes['form-cont']}>
        <form className={classes.form} autoComplete="off" ref={formRef} onSubmit={submitHandler}>
            {formMessageContent()}

            <div className={classes.control}>
                <label htmlFor="username" className='b'>Позывной</label>
                <input className={getClassName(errors.username)} type="text" id="username" name="username" maxLength={15} 
                onFocus={clearError.bind(null, 'username')}/>
                <span className="error-text">{errors.username ? errors.username : ''}</span>
            </div>

            <div className={classes.control}>
                <label htmlFor="reg-password" className='b'>Пароль</label>
                <input className={getClassName(errors.password1)} type="password" id="reg-password" name="password1"
                ref={pass1Ref} onFocus={clearError.bind(null, 'password1')} />
                <span className="error-text">{errors.password1 ? errors.password1 : ''}</span>
            </div>

            <div className={classes.control}>
                <label htmlFor="confirm" className='b'>Подтверждение пароля</label>
                <input className={getClassName(errors.password2)} type="password" id="confirm" name="password2" 
                ref={pass2Ref} onBlur={checkPasswordMatch} onFocus={clearError.bind(null, 'password2')} />
                <span className="error-text">{errors.password2 ? errors.password2 : ''}</span>
            </div>

            <hr className={classes.hr}/>

            <div className={classes.control}>
                <label htmlFor="dob" className='b'>Дата рождения</label>
                <input className={getClassName(errors.dob)} id="dob" name="dob" type="date"
                onFocus={clearError.bind(null, 'dob')} />
                <span className="error-text">{errors.dob ? errors.dob : ''}</span>
            </div>

            <div className={classes.switch}>
                <label htmlFor='telegram'>Есть в Telegram</label>
                <input type="checkbox" id="telegram" name="telegram" checked={hasTelegram} onChange={handleHasTelegram}/>
                <div className={classes.slider} onClick={handleHasTelegram}>
                    <span></span>
                </div>
            </div>

            <div className={classes.control}>
                <label className='b' htmlFor="contact" id="contact-label">{hasTelegram ? 'Telegram' : 'Электронная почта'}</label>
                <input className={getClassName(errors.contact)} type={hasTelegram ? 'text' : 'email'} id="contact" 
                maxLength={30} name="contact" onFocus={clearError.bind(null, 'contact')} />
                <span className="error-text">{errors.contact ? errors.contact : ''}</span>
            </div>

            <div className={classes.control}>
                <label htmlFor="UTC">Часовой пояс</label>
                <select className={classes.input} id="utc" name="utc"></select>
            </div>

            <hr className={classes.hr}/>

            <div className={classes.control}>
                <label className='b' htmlFor="hours">Количество наигранных часов</label>
                <input className={getClassName(errors.hours)} type="number" id="hours" name="hours"
                onFocus={clearError.bind(null, 'hours')} />
                <span className="error-text">{errors.hours ? errors.hours : ''}</span>
            </div>

            <div className={classes.checkscontrol}>
                <label>Предпочитаемая специализация</label>
                <div className={classes.checks}>
                    {Object.entries(specs).map(([id, spec]) => <label key={id}>
                        <input type="checkbox" name={`spec-${id}`}/>{ spec }
                    </label>)}
                </div>
            </div>

            <div className={classes.control}>
                <label htmlFor="teams">Отряды, в которых вы состояли</label>
                <textarea className={classes.textarea} id="teams" name="teams" maxLength={500} />
            </div>

            <div className={classes.checkscontrol}>
                <label>Проекты, на которых вы играли</label>
                <div className={classes.checks}>
                    {Object.entries(projects).map(([id, project]) => <label key={id}>
                        <input type="checkbox" name={`project-${id}`} />{ project }
                    </label>)}
                    <label>
                        <input type="checkbox" name="project-other" onClick={addExtraProject} /> Другие
                    </label>
                </div>
            </div>

            {extraProjectVisible && <div className={classes.control}>
                <label htmlFor="other-proj">Другие проекты</label>
                <textarea id="other-proj" className={classes.textarea} name="other" maxLength={500}/>
            </div>}


            <button className={`btn ${classes.btn}`}>Отправить заявку</button>

            <p className="center sm">Нажимая "Отправить", вы подтверждаете, что ознакомились с</p>
            <p className="center sm"><Link href="/about">информацией об отряде и его правилами</Link></p>
        </form>
        {loading && <div className={classes.loading}>
            <LoadingSpinner/>
        </div>}
    </div>}
    {success && <div className='center'>Заявка в отряд успешно отправлена. Командир отряда скоро свяжется с вами.</div>}
</>
}