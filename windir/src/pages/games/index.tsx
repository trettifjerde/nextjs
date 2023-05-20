import GameEntry from "@/components/games/game-entry";
import { GetStaticProps } from "next";
import { PageData, PlayerGames } from "@/util/types";
import { MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";
import { useSession } from "next-auth/react";
import UserGameEntry from "@/components/games/user-game-entry";
import { useState } from "react";

export default function Games({players}: {players: {[key: string]: boolean[]}}) {
    const {data: session} = useSession();
    const [error, setError] = useState('');

    return <>
        <div className="error-text center">{error}</div>
        {Object.keys(players).length > 0 && Object.entries(players).map(([username, days]) => session?.user?.username === username ?
            <UserGameEntry key={username} username={username} info={days} setError={setError}/> :
            <GameEntry key={username} username={username} games={days} />)}
        {Object.keys(players).length === 0 && <div className="center">Нет данных</div>}
    </>
}

export const getStaticProps: GetStaticProps<{players: PlayerGames, data: PageData}> = async(context) => {

    const props = {
        data: {image: '', title: 'Игры', styles: 'games'},
        players: {} as PlayerGames
    };
    
    let client: MongoClient;
    try {
        client = await MongoClient.connect(dbUrl);
    }
    catch (error) {
        console.log(error);
        return {props};
    }

    try {
        const games = await client.db().collection('windir-games').find().toArray();
        console.log(games);
        props.players = games.reduce((acc, v) => {
            acc[v.username] = v.games;
            return acc;
        }, {} as PlayerGames)
    }
    catch(error) {
        console.log(error);
    }
    client.close();
    return {props};    
}