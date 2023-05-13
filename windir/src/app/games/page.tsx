import { games } from "@/util/games";
import classes from './games.module.css';
import GameEntry from "@/components/game-entry";
import PageContent from "@/components/ui/page-content";

export default function Games() {
    return (<PageContent>
        <h1>Игры</h1>
        <div className={classes.games}>
            {Object.entries(games).map(([username, days]) => <GameEntry key={username} username={username} info={days} />)}
        </div>
    </PageContent>)
}