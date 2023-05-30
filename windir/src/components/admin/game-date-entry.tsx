import { AdminPanelGame } from "@/util/types";
import classes from './games.module.css';
import Image from "next/image";
import { MouseEvent, useCallback, useState } from "react";
import GameDateEntryForm from "./game-date-entry-edit";
import { getLongDay } from "@/util/games";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import LoadingSpinner from "../ui/spinner";

export default function GameDateEntry({game, updateGame, deleteGame}: {
    game: AdminPanelGame, 
    updateGame: (data: AdminPanelGame) => Promise<{message: string, isError: boolean}>,
    deleteGame: (data: AdminPanelGame) => void
}) {
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleMode = useCallback(() => {
        setEditMode(prev => !prev);
        setMessage('');
    }, [setEditMode, setMessage]);
    
    const handleUpdate = useCallback(async (data: AdminPanelGame) => {
        setLoading(true);
        setMessage('');
        
        const res = await updateGame(data);
        
        if (!res.isError) setEditMode(false);
        
        setMessage(res.message);
        setLoading(false);
        
    }, [updateGame, setMessage, setLoading, setEditMode]);
    
    const handleDelete = useCallback(() => deleteGame(game), [game, deleteGame]);

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

        {loading && <LoadingSpinner />}
    </div>
}