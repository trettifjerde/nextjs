import { useCallback, useState } from "react";
import classes from './user-menu.module.css';
import UserEditForm from './user-edit-form';
import { useSession, signOut } from "next-auth/react";

function UserMenu() {
    const [formVisible, setFormVisible] = useState(false);
    const {data: session, status} = useSession();
    console.log(session);

    const toggleEdit = useCallback(() => setFormVisible(prev => !prev), [setFormVisible]);
    const logoutHandler = useCallback(() => signOut({redirect: false}), []);

    return (<div>
        <p className={classes.user}>Добро пожаловать, <span></span></p>
        {!formVisible && <div>
                <button className='btn' type="button" onClick={toggleEdit}>Сменить пароль</button>
                <button className='btn' type="button" onClick={logoutHandler}>Выйти</button>
            </div>
        }
        {formVisible && <UserEditForm toggleEdit={toggleEdit} />}
    </div>)
}
export default UserMenu;