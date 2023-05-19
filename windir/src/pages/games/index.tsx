import GameEntry from "@/components/games/game-entry";
import { GetStaticProps } from "next";
import { PlayerGames } from "@/util/types";
import { MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";

export default function Games({players}: {players: {[key: string]: boolean[]}}) {
    return <>
        {Object.entries(players).map(([username, days]) => <GameEntry key={username} username={username} info={days} />)}
    </>
}

export const getStaticProps: GetStaticProps<{players: PlayerGames}> = async(context) => {
    const client = await MongoClient.connect(dbUrl);

    const games = await client.db().collection('windir-users').find({isActive: true}).sort({username: 1}).toArray();
    return {
        props: {
            data: {image: '', title: 'Игры', styles: 'games'},
            players: games.reduce((acc, v) => {
                acc[v.username] = v.games;
                return acc;
            }, {} as PlayerGames)
        }
    }
    
}