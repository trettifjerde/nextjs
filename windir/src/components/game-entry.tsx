'use client';
import { useCallback, useState } from 'react';
import classes from './games-entry.module.css';

export default function GameEntry({username, info}: {username: string, info: boolean[]}) {
    const [games, setGames] = useState(info);
    const [pendingCells, setPengedingCells] = useState<{[key: string]: number[]}>({});

    const toggleGame = useCallback((i: number) => setGames(prev => {
        const upGames = [...prev];
        upGames[i] = !upGames[i];
        return upGames;
    }), [setGames]);

    return (<div className={classes.entry}>
        <div className={classes.username}>{username}</div>
        {games.map((game, i) => <div key={i} className={`${classes.cell} ${(pendingCells[username] && pendingCells[username].find(index => index === i)) ? classes.pending : game ? classes.on : classes.off}`} onClick={toggleGame.bind(null, i)}/>)}
    </div>)
}