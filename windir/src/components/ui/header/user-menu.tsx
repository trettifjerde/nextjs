'use client';
import classes from './user-menu.module.css';
import UserContext from "@/context/user-context";
import { useCallback, useContext, useState } from "react";
import UserEditForm from './user-edit-form';

function UserMenu() {
    const { username, signOut } = useContext(UserContext);
    const [formVisible, setFormVisible] = useState(false);

    const toggleEdit = useCallback(() => setFormVisible(prev => !prev), [setFormVisible]);

    return (<div className='center'>
        <p className={classes.user}>Добро пожаловать, <span>{username}</span></p>
        {!formVisible && <div>
                <button className='btn' type="button" onClick={toggleEdit}>Сменить пароль</button>
                <button className='btn' type="button" onClick={signOut}>Выйти</button>
            </div>
        }
        {formVisible && <UserEditForm toggleEdit={toggleEdit} />}
    </div>)
}
export default UserMenu;