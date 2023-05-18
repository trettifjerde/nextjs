import { games } from "@/util/games";
import GameEntry from "@/components/games/game-entry";
import PageContent from "@/components/page/page-content";

export default function Games() {
    return (<PageContent data={{image: '', title: 'Игры', styles: 'games'} }>
        {Object.entries(games).map(([username, days]) => <GameEntry key={username} username={username} info={days} />)}
    </PageContent>)
}