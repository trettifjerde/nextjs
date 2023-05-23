import classes from "./game-entry.module.css";

export default function GameEntry({username, games}: {username: string, games: boolean[]}) {
    return (<tr>
        <td className={classes.username}>{username}</td>
        {games.map((game, i) => <td key={i} className={`${classes.cell} ${game ? classes.on : classes.off}`}/>)}
    </tr>)
}