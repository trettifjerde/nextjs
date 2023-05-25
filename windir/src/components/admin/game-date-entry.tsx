import { Game } from "@/util/types";
import classes from './games.module.css';
import Image from "next/image";
import { useCallback, useState } from "react";
import { fetchData } from "@/util/fetch";
import GameDateEntryForm from "./game-date-entry-edit";
import { getLongDay } from "@/util/games";

export default function GameDateEntry({game, updateGame, deleteGame}: {
    game: Game, 
    updateGame: (id: string) => void,
    deleteGame: (id: string) => void
}) {
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const toggleMode = useCallback(() => setEditMode(prev => !prev), [setEditMode]);
    const handleUpdate = useCallback(async (btn: HTMLButtonElement, data: Game) => {  
        btn.disabled = true;
        setLoading(true);

        const res = await fetchData('/api/game/update', data);
        if (!res.ok) {
            const {error} = await res.json();
            setMessage(error);
        }
        else setMessage('Информация обновлена');

        setLoading(false);
        btn.disabled = false;
    }, [setLoading, setMessage]);

    const handleDelete = useCallback(() => deleteGame(game.id), [game, deleteGame]);

    return <>
        <p className="sm">{message}</p>

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
}