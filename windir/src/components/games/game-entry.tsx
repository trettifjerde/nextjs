import classes from "./game-entry.module.css";

export default function GameEntry({username, games}: {username: string, games: boolean[]}) {
    return (<div className={`${classes.entry}`}>
        <div className={classes.username}>{username}</div>
        {games.map((game, i) => <div key={i} className={`${classes.cell} ${game ? classes.on : classes.off}`}/>)}
    </div>)
}