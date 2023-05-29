import { AdminPanelGame, Game } from "@/util/types";
import classes from './games.module.css';
import Image from "next/image";
import { MouseEvent, useCallback, useState } from "react";
import { fetchData } from "@/util/fetch";
import GameDateEntryForm from "./game-date-entry-edit";
import { getLongDay } from "@/util/games";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function GameDateEntry({game: initialGame, updateGame, deleteGame}: {
    game: AdminPanelGame, 
    updateGame: (id: string) => void,
    deleteGame: (e: MouseEvent, id: string) => void
}) {
    const [game, setGame] = useState(initialGame);
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleMode = useCallback(() => {
        setEditMode(prev => !prev);
        setMessage('');
    }, [setEditMode, setMessage]);

    const handleUpdate = useCallback(async (btn: HTMLButtonElement, data: AdminPanelGame) => {  
        btn.disabled = true;
        setLoading(true);

        const res = await fetchData('/api/schedule/update', data);
        if (!res.ok) {
            const {error} = await res.json();
            setMessage(error);
        }
        else {
            setGame(data);
            setMessage('Информация обновлена');
            setEditMode(false);
        }

        setLoading(false);
        btn.disabled = false;
    }, [setEditMode, setGame, setLoading, setMessage]);

    const handleDelete = useCallback((e: MouseEvent) => deleteGame(e, game.id), [game, deleteGame]);

    return <div className={classes.entry}>
        <p className="sm">{message}</p>

        <SwitchTransition mode="out-in">
            <CSSTransition key={editMode.toString()} timeout={250} classNames={editMode ? 'form' : 'entry'}>
                <>
                    {!editMode && <div className={classes.game}>
                            <div className={classes.info}>
                                <span className="b">{getLongDay(game.day)}</span>
                                <span>
                                    <Image src={game.image} alt="" width={75} height={75} />
                                </span>
                                <span>{game.time}</span>
                            </div>
                            <div className={classes.control}>
                                <button className="btn btn-dark" type="button" onClick={toggleMode}>Изменить</button>
                                <button className="btn btn-dark" type="button" onClick={handleDelete}>Удалить</button>
                            </div>
                        </div>}

                    {editMode && <GameDateEntryForm game={game} toggleForm={toggleMode} handleSubmit={handleUpdate}/>}
                </>
            </CSSTransition>
        </SwitchTransition>


    </div>
}