import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { FindOptions, MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";
import { Game, GameEntry, PageData, UsernameChangeEntry, WindirEntry, WindirUser } from "@/util/types";
import { castToGame, castToUser } from "@/util/admin";
import AdminPanel from "@/components/admin/admin-panel";
import { sortGames, sortUsers } from "@/util/games";

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
                const dbGames = await client.db().collection<GameEntry>('windir-games')
                    .find({}, {time: 1, day: 1, image: 1} as FindOptions)
                    .toArray();
                client.close();

                const users = sortUsers(dbUsers.map(user => castToUser(user)));
                const changeRequests = users.filter(user => user.newUsername).map(user => ({id: user.id, oldN: user.username, newN: user.newUsername}));
                const games = sortGames(dbGames.map(game => castToGame(game)));

                return {
                    props: {
                        users,
                        changeRequests,
                        games,
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