import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";
import { PageData, WindirEntry, WindirUser } from "@/util/types";
import { castToUser } from "@/util/admin";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UsersTable from "@/components/admin/users";

export default function Admin({users : u}: {users: WindirUser[]}) {

    console.log(u);
    const [users, setUsers] = useState(u.filter(user => !user.isNew));
    const [newUsers, setNewUsers] = useState(u.filter(user => user.isNew));

    const [error, setError] = useState('');
    const {status} = useSession();
    const router = useRouter();

    const toggleActive = useCallback(async(e: MouseEvent, id: string) => {
        (e.target as HTMLButtonElement).disabled = true;

        const user = users.find(u => u.id === id);
        console.log(user);

        if (user) {
            const res = await fetch('/api/activate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: user.username, isActive: !user.isActive})
            })
            .catch(error => {
                return new Response(JSON.stringify({error: 'Повторите позже'}), {status: 500})
            });

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

        const res = await fetch('/api/accept', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id})
        })
        .catch(e => (new Response(JSON.stringify({error: 'Повторите позже'}), {status: 500})));

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

    const getAcceptText = useCallback(() => ('Принять'), []);
    const getActiveText = useCallback((user: WindirUser) => (user.isActive ? 'Деактивировать' : 'Активировать'), []);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/');
        }
    }, [status]);

    return <>
        <div className="error-text center">{error}</div>
        <h2>Новые заявки</h2>
        <UsersTable users={newUsers} clickHandler={acceptUser} getText={getAcceptText} />
        <h2>Игроки</h2>
        <UsersTable users={users} clickHandler={toggleActive} getText={getActiveText} />
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
            const users = dbUsers.map(user => castToUser(user))
            client.close();
            return {
                props: {
                    users,
                    data: {image: '', styles: 'admin', title: 'Панель управления'} as PageData
                }
            }
        }
        catch (error) {
            console.log(error);
            client.close();
        }

    }
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
}