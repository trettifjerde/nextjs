import classes from './games.module.css';
import { games } from "@/util/games";
import GameEntry from "@/components/games/game-entry";
import PageContent from "@/components/article/page-content";

export default function Games() {
    return (<PageContent className={classes.games} data={{mainImage: '', title: 'Игры'} }>
        <div className={classes.games}>
            {Object.entries(games).map(([username, days]) => <GameEntry key={username} username={username} info={days} />)}
        </div>
    </PageContent>)
}