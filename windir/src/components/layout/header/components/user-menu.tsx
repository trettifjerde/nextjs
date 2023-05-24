import { useCallback, useState } from "react";
import formClasses from './user-menu.module.css';
import { useSession, signOut } from "next-auth/react";
import UserEditForm from "./user-edit";

function UserMenu() {
    const {data: session} = useSession();
    const [editMode, setEditMode] = useState(false);

    const toggleEdit = useCallback(() => setEditMode(prev => !prev), [setEditMode]);
    const logoutHandler = useCallback(() => signOut({redirect: false}), []);

    return (<div>
        <p className={formClasses.user}>Добро пожаловать<span>{session ? `, ${session.user?.username}` : ''}</span></p>
        <UserEditForm visible={editMode} toggleModal={toggleEdit} />
        {!editMode && <div>
                <button className='btn' type="button" onClick={toggleEdit}>Профиль</button>
                <button className='btn' type="button" onClick={logoutHandler}>Выйти</button>
            </div>
        }
    </div>)
}
export default UserMenu;