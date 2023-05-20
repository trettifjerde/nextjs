import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import classes from './game-entry.module.css';

export default function UserGameEntry({username, info, setError}: {
    username: string, info: boolean[], setError: Dispatch<SetStateAction<string>>
}) {
    const [games, setGames] = useState(info);
    const [pending, setPending] = useState<number[]>([]);

    const toggleGame = useCallback(async (i: number) => {
        setError('');
        setPending(prev => [...prev, i]);

        const updGames = games.map((game, j) => i === j ? !game : game);

        const res = await fetch('/api/games', {
            method: 'POST',
            body: JSON.stringify({username, games: updGames}),
            headers: {'Content-Type': 'application/json'}
        })
        .catch(e => new Response(JSON.stringify({error: 'Ошибка доступа к базе данных. Проверьте подключение к интернету'}), {status: 500}));

        if (res.ok) setGames(prev => prev.map((game, j) => i === j ? !game : game));
        
        else {
            const {error} = await res.json();
            setError(error);
        }
        setPending(prev => prev.filter(n => n!== i));
        
    }, [games, setGames, setPending]);

    return (<div className={`${classes.entry} ${classes.isuser}`}>
        <div className={classes.username}>{username}</div>
        {games.map((game, i) => 
            <div 
                key={i} 
                className={`${classes.cell} ${pending.includes(i) ? classes.pending : game ? classes.on : classes.off}`} 
                onClick={toggleGame.bind(null, i)}/>)}
        </div>)
}