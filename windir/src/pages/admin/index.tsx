import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";
import { PageData, UsernameChangeEntry, WindirEntry, WindirUser } from "@/util/types";
import { castToUser } from "@/util/admin";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UsersTable from "@/components/admin/users";
import { fetchData } from "@/util/fetch";
import Spoiler from "@/components/ui/spoiler";
import UsernamesTable from "@/components/admin/usernames";

export default function Admin({users : u, changeRequests: cR}: {users: WindirUser[], changeRequests: UsernameChangeEntry[]}) {

    const [users, setUsers] = useState(u.filter(user => !user.isNew));
    const [newUsers, setNewUsers] = useState(u.filter(user => user.isNew));
    const [changeRequests, setChangeRequests] = useState(cR);

    const [error, setError] = useState('');
    const {status} = useSession();
    const router = useRouter();

    const toggleActive = useCallback(async(e: MouseEvent, id: string) => {
        (e.target as HTMLButtonElement).disabled = true;
        setError("");

        const user = users.find(u => u.id === id);
        console.log(user);

        if (user) {
            const res = await fetchData('/api/activate', {username: user.username, isActive: !user.isActive});

            if (res.ok) {
                setUsers(prev => {
                    const upd = [...prev];
                    const i = upd.findIndex(u => u.id === id);
                    upd[i] = {...upd[i], isActive: !upd[i].isActive};
                    return upd;
                })
            }
            else {
                const {error} = await res.json();
                setError(error);
            }
        }
        else setError('Пользователь не найден');

        (e.target as HTMLButtonElement).disabled = false;

    }, [users, setUsers, setError]);

    const acceptUser = useCallback(async(e: MouseEvent, id: string) => {
        (e.target as HTMLButtonElement).disabled = true;
        setError("");

        const res = await fetchData('/api/accept', {id});

        if (res.ok) {
            const user = newUsers.find(u => u.id === id)!;
            user.isNew = false;
            setNewUsers(prev => prev.filter(user => user.id !== id));
            setUsers(prev => [...prev, user]);
        }
        else {
            const {error} = await res.json();
            setError(error);
        }

        (e.target as HTMLButtonElement).disabled = false;
    }, [newUsers, setNewUsers, setUsers, setError]);

    const manageUsernameChange = useCallback(async(e: MouseEvent, id: string, confirm: boolean) => {
        const btn = e.target as HTMLButtonElement;
        btn.disabled = true;
        setError("");

        const res = await fetchData('/api/confirmusername', {id, confirm});
        if (res.ok) {
            setChangeRequests(prev => (prev.filter(r => r.id !== id)))
        }
        else {
            const {error} = await res.json();
            setError(error);
        }

        btn.disabled = false;
    }, [setChangeRequests, setError]);

    const getAcceptText = useCallback(() => ('Принять'), []);
    const getActiveText = useCallback((user: WindirUser) => (user.isActive ? 'Деактивировать' : 'Активировать'), []);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/');
        }
    }, [status]);

    return <>
        <div className="error-text center">{error}</div>
        <Spoiler header="Новые заявки в отряд" initial={true}>
            <UsersTable users={newUsers} clickHandler={acceptUser} getText={getAcceptText} />
        </Spoiler>
        <Spoiler header="Заявки на смену позывного" initial={true}>
            <UsernamesTable users={changeRequests} clickHandler={manageUsernameChange} />
        </Spoiler>
        <Spoiler header="Активные игроки" initial={false}>
            <UsersTable users={users.filter(user => user.isActive)} clickHandler={toggleActive} getText={getActiveText} />
        </Spoiler>
        <Spoiler header="Неактивные игроки" initial={false}>
            <UsersTable users={users.filter(user => !user.isActive)} clickHandler={toggleActive} getText={getActiveText} />

        </Spoiler>
    </>
}

export const getServerSideProps: GetServerSideProps = async({req, res}) => {
    const session = await getServerSession(req, res, authOptions);

    if (session?.user?.username === 'admin') {
        let client: MongoClient;

        try { client = await MongoClient.connect(dbUrl)}
        catch (error) {
            console.log(error);
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        try {
            const dbUsers = await client.db().collection<WindirEntry>('windir-users').find().toArray();
            const users = dbUsers.map(user => castToUser(user));
            const changeRequests = await client.db().collection('windir-users').find({newUsername: {$exists: true}}).toArray();

            client.close();
            return {
                props: {
                    users,
                    changeRequests: changeRequests.map(r => ({id: r._id.toString(), oldN: r.username, newN: r.newUsername})),
                    data: {image: '', styles: 'admin', title: 'Панель управления'} as PageData
                }
            }
        }
        catch (error) {
            console.log(error);
            client.close();
            return {props: {data: {image: '', styles: 'admin', title: 'Панель управления'} as PageData}}
        }

    }
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
}