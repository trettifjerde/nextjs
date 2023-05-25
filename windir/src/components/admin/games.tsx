import { Game } from "@/util/types";
import classes from './games.module.css';
import GameDateEntry from "./game-date-entry";
import { useCallback, useState } from "react";
import GameDateEntryForm from "./game-date-entry-edit";
import LoadingSpinner from "../ui/spinner";
import { fetchData } from "@/util/fetch";

export default function GamesTable({games: g}: {games: Game[]}) {

    const [games, setGames] = useState(g);
    const [message, setMesssage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleMode = useCallback(() => setEditMode(prev => !prev), [setEditMode]);

    const addGame = useCallback(async (btn: HTMLButtonElement, data: Game) => {
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
            setGames(prev => ([...prev, {id, ...game}]))
        }

        btn.disabled = false;
        setLoading(false);

    }, [setGames]);

    const updateGame = useCallback((id: string) => {}, [setGames]);
    const deleteGame = useCallback((id: string) => {}, [setGames]);

    return <>
            <p className="center">{message}</p>

            {games.length === 0 && <div className="center">Игры не анонсированы</div>}

            {games.length > 0 && games.map(game => <GameDateEntry game={game} key={game.id} updateGame={updateGame} deleteGame={deleteGame} />)}

            {editMode && <GameDateEntryForm toggleForm={toggleMode} handleSubmit={addGame} />}

            {! editMode && <div className={classes.add}>
                <button type="button" className="btn btn-dark" onClick={toggleMode}>Добавить игру</button>
            </div>}

        {loading && <LoadingSpinner />}
    </>
}