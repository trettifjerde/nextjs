import { Game, ShortPlayerInfo } from "@/util/types";
import classes from "./games.module.css";
import { useState } from "react";
import { makeUserGames } from "@/util/games";

export default function UserGameEntry({user, games}: {user: ShortPlayerInfo, games: Game[]}) {
    const [entries, setEntries] = useState(makeUserGames(user, games));

    return (<tr>
        <td className={classes.username}>{user.username}</td>
        {entries.map(entry => <td key={entry.gameId} className={`${classes.cell} ${entry.on ? classes.on : classes.off}`}/>)}
    </tr>)
}