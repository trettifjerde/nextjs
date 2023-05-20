import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";
import { PageData, WindirEntry } from "@/util/types";
import { castToUser } from "@/util/admin";

export default function Admin({users}: {users: WindirEntry[]}) {
    return <div>
        {users.map(user => <div key={user.username}>{user.username} ({user.isActive.toString()})</div>)}
    </div>
}

export const getServerSideProps: GetServerSideProps = async({req, res}) => {
    const session = await getServerSession(req, res, authOptions);

    if (session?.user?.username === 'meow') {
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