import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import classes from "./games.module.css";
import { fetchData } from '@/util/fetch';
import { Game, ShortPlayerInfo } from '@/util/types';
import { makeUserGames } from '@/util/games';

export default function UserOwnEntry({user, games, setError}: {
    user: ShortPlayerInfo, games: Game[], setError: Dispatch<SetStateAction<string>>
}) {
    const [entries, setEntries] = useState(makeUserGames(user, games));
    const [pending, setPending] = useState<number[]>([]);

    const toggleGame = useCallback(async (i: number) => {
        setError('');
        const {gameId, on} = entries[i];
        setPending(prev => [...prev, i]);

        const res = await fetchData('/api/games', {gameId: gameId, userId: user.id, on: !on});

        if (res.ok) setEntries(prev => {
            const upd = [...prev];
            upd[i] = {gameId, on: !on};
            return upd;
        });
        
        else {
            const {error} = await res.json();
            setError(error);
        }
        setPending(prev => prev.filter(n => n !== i));
        
    }, [games, setEntries, setPending]);

    return (<tr className={classes.isuser}>
        <td className={classes.username}>{user.username}</td>
        {entries.map((entry, i) => 
            <td 
                key={entry.gameId} 
                className={`${classes.cell} ${pending.includes(i) ? classes.pending : entry.on ? classes.on : classes.off}`} 
                onClick={toggleGame.bind(null, i)}/>)}
        </tr>)
}