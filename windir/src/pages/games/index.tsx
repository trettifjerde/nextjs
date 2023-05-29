import { GetServerSideProps } from "next";
import { Game, GameEntry, ShortPlayerInfo, WindirEntry, WindirUser } from "@/util/types";
import { FindOptions, MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";
import GamesTable from "@/components/games/games-table";
import { castToGame } from "@/util/admin";
import { sortGames, sortUsers } from "@/util/games";

export default function GamesPage({ games, players }: { games: Game[], players: WindirUser[] }) {
    if (Object.keys(games).length > 0)
        return <GamesTable games={games} players={players} />

    else
        return <div className="center">Нет данных</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const props = {
        data: { image: '', title: 'Игры', styles: '' },
        games: [] as Game[],
        players: [] as ShortPlayerInfo[]
    };

    try {
        const client = await MongoClient.connect(dbUrl);

        try {
            const dbGames = (await client.db().collection('windir-games').find().toArray()) as GameEntry[];
            const dbUsers = await client.db().collection('windir-users').find({isActive: true}, {username: 1} as FindOptions).toArray() as WindirEntry[];

            props.games = sortGames(dbGames.map(game => castToGame(game)));
            props.players = sortUsers(dbUsers.map(user => ({username: user.username as string, id: user._id.toString()})));
        }
        catch (error) {
            client.close();
            throw error;
        }
    }
    catch (error) {
        console.log(error);
    }

    return { props };
}