import { AdminPanelGame, Game } from "@/util/types";
import classes from './games.module.css';
import GameDateEntry from "./game-date-entry";
import { MouseEvent, useCallback, useState } from "react";
import GameDateEntryForm from "./game-date-entry-edit";
import LoadingSpinner from "../ui/spinner";
import { fetchData } from "@/util/fetch";
import { sortGames } from "@/util/games";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function GamesTable({games: g}: {games: AdminPanelGame[]}) {

    const [games, setGames] = useState(g);
    const [message, setMesssage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleMode = useCallback(() => setEditMode(prev => !prev), [setEditMode]);

    const addGame = useCallback(async (btn: HTMLButtonElement, data: AdminPanelGame) => {
        btn.disabled = true;
        setLoading(true);

        const {id: _, ...game} = data;

        const res = await fetchData('/api/schedule/add', game);
        if (!res.ok) {
            const {error} = await res.json();
            setMesssage(error);
        }
        else {
            const {id} = await res.json();
            setGames(prev => sortGames([...prev, {id, ...game}]))
        }

        btn.disabled = false;
        setLoading(false);

    }, [setGames]);

    const updateGame = useCallback((id: string) => {}, [setGames]);

    const deleteGame = useCallback(async(e: MouseEvent, id: string) => {
        const btn = (e.target) as HTMLButtonElement;
        btn.disabled = true;
        setLoading(true);

        const res = await fetchData('/api/schedule/delete', {id});
        if (!res.ok) {
            const {error} = await res.json();
            setMesssage(error);
        }
        else {
            setGames(prev => prev.filter(game => game.id !== id));
        }
        setLoading(false);
        btn.disabled = false;
    }, [setGames, setLoading, setMesssage]);

    return <div className={classes.cont}>
            <p className="center">{message}</p>

            {games.length === 0 && <div className="center">Игры не анонсированы</div>}

            {games.length > 0 && games.map(game => <GameDateEntry game={game} key={game.id} updateGame={updateGame} deleteGame={deleteGame} />)}

            <SwitchTransition mode="out-in">
                <CSSTransition key={editMode.toString()} timeout={250} classNames={editMode ? 'form' : 'entry'}>
                    <>
                        {editMode && <GameDateEntryForm toggleForm={toggleMode} handleSubmit={addGame} />}
                        {! editMode && <div className={classes.add}>
                            <button type="button" className="btn btn-dark" onClick={toggleMode}>Добавить игру</button>
                        </div>}
                    </>
                </CSSTransition>
            </SwitchTransition>


        {loading && <LoadingSpinner />}
    </div>
}