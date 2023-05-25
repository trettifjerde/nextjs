import { Game, ShortPlayerInfo } from "@/util/types";
import { Dispatch, SetStateAction } from "react";
import UserOwnEntry from "./user-own-entry";
import UserGameEntry from "./user-game-entry";
import { useSession } from "next-auth/react";


export default function GamesTableBody({games, players, setError}: {games: Game[], players: ShortPlayerInfo[], setError: Dispatch<SetStateAction<string>>}) {
    const {data: session} = useSession();

    if (session?.user?.username === 'admin') {
        return <>
            {players.map(user => <UserOwnEntry key={user.id} user={user} games={games} setError={setError} />)}
        </>
    }

    else {
        return <>
            {players.map(user => session?.user?.username === user.username ? 
                <UserOwnEntry key={user.id} user={user} games={games} setError={setError} /> :
                <UserGameEntry key={user.id} user={user} games={games} />
            )}
        </>
    }
}