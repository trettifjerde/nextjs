import { AdminPanelGame } from "@/util/types";
import classes from './games.module.css';
import GameDateEntry from "./game-date-entry";
import { useCallback, useState } from "react";
import GameDateEntryForm from "./game-date-entry-edit";
import LoadingSpinner from "../ui/spinner";
import { fetchData } from "@/util/fetch";
import { sortGames } from "@/util/games";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import ConfirmationModal from "../ui/conf-modal";

export default function GamesTable({games: g}: {games: AdminPanelGame[]}) {

    const [games, setGames] = useState(g);
    const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gameBeingDeleted, setGameBeingDeleted] = useState<AdminPanelGame|null>(null);

    const toggleMode = useCallback(() => {
        setMessage('');
        setEditMode(prev => !prev)
    }, [setEditMode]);

    const addGame = useCallback(async (data: AdminPanelGame) => {
        setMessage('');
        setLoading(true);

        const {id: _, ...game} = data;

        const res = await fetchData('/api/schedule/add', game);
        if (!res.ok) {
            const {error} = await res.json();
            setMessage(error);
        }
        else {
            const {id} = await res.json();
            setGames(prev => sortGames([...prev, {id, ...game}]));
            toggleMode();
        }
        setLoading(false);

    }, [setGames, setLoading, toggleMode, setMessage]);

    const updateGame = useCallback(async(data: AdminPanelGame) => {
        const res = await fetchData('/api/schedule/update', data);
        if (!res.ok) {
            const {error} = await res.json();
            return {message: error, isError: true};
        }
        else {
            setGames(prev => {
                const updGames = [...prev];
                const i = updGames.findIndex(g => g.id === data.id);
                updGames[i] = {...data};
                return updGames
            });
            return {message: 'Информация обновлена', isError: false}
        }
    }, [setGames]);

    
    const deleteGame = useCallback(async(id: string) => {
        setLoading(true);
        setMessage('');

        const res = await fetchData('/api/schedule/delete', {id});
        if (!res.ok) {
            const {error} = await res.json();
            setMessage(error);
        }
        else {
            setGames(prev => prev.filter(game => game.id !== id));
        }

        setLoading(false);
    }, [setGames, setMessage, setLoading]);
    
    const confirmGameDelete = useCallback((game: AdminPanelGame) => setGameBeingDeleted(game), [setGameBeingDeleted]);
    const cancelGameDelete = useCallback(() => setGameBeingDeleted(null), [setGameBeingDeleted]);

    return <div className={classes.cont}>
            <p className="sm center">{message}</p>

            {games.length === 0 && <div className="center">Игры не анонсированы</div>}

            {games.length > 0 && games.map(game => <GameDateEntry game={game} key={game.id} updateGame={updateGame} deleteGame={confirmGameDelete} />)}

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

            <ConfirmationModal game={gameBeingDeleted} onConfirm={deleteGame} toggleModal={cancelGameDelete}/>

        {loading && <LoadingSpinner />}
    </div>
}