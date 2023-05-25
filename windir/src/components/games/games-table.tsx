import { Game } from "@/util/types";
import { useState } from "react";
import classes from './games.module.css';
import { getDay } from "@/util/games";
import GamesTableBody from "./games-table-body";


export default function GamesTable({games, players}: {games: Game[], players: {username: string, id: string}[]}) {

    const [error, setError] = useState('');

    return <>
        <div className="error-text center">{error}</div>
        <div className={classes.cont}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.reload}>Обновить</th>
                        {games.map(game => <th key={game.id}>
                            <div>{getDay(game.day)}</div>
                            <div>{game.time}</div> 
                        </th>)}
                    </tr>
                </thead>
                <tbody>

                {players.length === 0 && <tr>
                    <td className="center" colSpan={games.length + 1}>Нет активных игроков</td>
                </tr>}

                {players.length > 0 && <GamesTableBody games={games} players={players} setError={setError}/>} 
                </tbody>
            </table>
        </div>
    </>

}