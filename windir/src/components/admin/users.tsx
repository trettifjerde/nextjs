import { WindirUser } from '@/util/types';
import classes from './users.module.css';
import { MouseEvent } from 'react';
import specs from '@/util/specs';
import projects from '@/util/projects';

export default function UsersTable({users, clickHandler, getText}: {
    users: WindirUser[], clickHandler: (e: MouseEvent, id: string) => void, getText: (user: WindirUser) => string}) {
    return (<>
        {users.length > 0 && <table className={classes.table}>
            <thead>
                <tr>
                    <th>Позывной</th>
                    <th>Контакт</th>
                    <th>ДР</th>
                    <th>UTC</th>
                    <th>Часы</th>
                    <th>Специализации</th>
                    <th>Отряды</th>
                    <th>Проекты</th>
                    <th>Управление</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.contact}</td>
                    <td>{new Date(user.dob).toLocaleDateString('ru-RU', {month: '2-digit', day: 'numeric', year: 'numeric'})}</td>
                    <td>{user.utc.replace(/\w+\//, '')}</td>
                    <td>{user.hours}</td>
                    <td>{user.specs.map(s => <p key={s}>{specs[s]}</p>)}</td>
                    <td>{user.teams}</td>
                    <td>{user.projects.map(p => <p key={p}>{projects[p]}</p>)}</td>
                    <td><button className="btn btn-dark" onClick={e => clickHandler(e, user.id)}>{getText(user)}</button></td>
                </tr>)}
            </tbody>
        </table>}
        {users.length === 0 && <div className='center'>Нет игроков</div>}
    </>)
}