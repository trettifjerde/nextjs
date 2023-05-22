import { MouseEvent } from "react";
import classes from './users.module.css';
import { UsernameChangeEntry } from "@/util/types";

export default function UsernamesTable({users, clickHandler}: {
    users: UsernameChangeEntry[],
    clickHandler: (e: MouseEvent, id: string, confirm: boolean) => void
}) {
    return <>
        {users.length > 0 && <>
            <div className={`${classes['change-entry']} b`}>
                <div>Текущий позывной</div>
                <div>Новый позывной</div>
                <div></div>
            </div>
            {users.map(info => <div key={info.id} className={classes['change-entry']}>
                <div>{info.oldN}</div>
                <div>{info.newN}</div>
                <div className="right">
                    <button type="button" className="btn btn-dark" onClick={e => clickHandler(e, info.id, true)}>Одобрить</button>
                    <button type="button" className="btn btn-dark" onClick={e => clickHandler(e, info.id, false)}>Отклонить</button>
                </div>
            </div>)}
        </>}
        {users.length === 0 && <div className="center">Нет заявок</div>}
    </>
}