import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { FindOptions, MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";
import { Game, GameEntry, PageData, UsernameChangeEntry, WindirEntry, WindirUser } from "@/util/types";
import { castToGame, castToUser } from "@/util/admin";
import AdminPanel from "@/components/admin/admin-panel";

export default function Admin(props: {users: WindirUser[], changeRequests: UsernameChangeEntry[], games: Game[]}) {
    return <AdminPanel {...props} />
}

export const getServerSideProps: GetServerSideProps = async({req, res}) => {
    const session = await getServerSession(req, res, authOptions);

    if (session?.user?.username === 'admin') {

        try {
            const client = await MongoClient.connect(dbUrl);

            try {

                const dbUsers = await client.db().collection<WindirEntry>('windir-users').find().toArray();
                const games = await client.db().collection('windir-games')
                    .find({}, {time: 1, day: 1, image: 1} as FindOptions).toArray() as GameEntry[];
                client.close();

                const users = dbUsers.map(user => castToUser(user));
                const changeRequests = users.filter(user => user.newUsername).map(user => ({id: user.id, oldN: user.username, newN: user.newUsername}));

                return {
                    props: {
                        users,
                        changeRequests,
                        games: games.map(game => castToGame(game)),
                        data: {image: '', styles: '', title: 'Панель управления'} as PageData
                    }
                }
            }
            catch(error) {
                client.close();
                throw error;
            }
        }
        catch (error) {
            console.log(error);
            return {props: {data: {image: '', styles: '', title: 'Панель управления'} as PageData}}
        }

    }
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
}