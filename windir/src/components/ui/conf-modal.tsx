import { MouseEvent, useCallback } from "react";
import Modal from "./modal";
import classes from './conf-modal.module.css';
import { AdminPanelGame } from "@/util/types";
import { getLongDay } from "@/util/games";

export default function ConfirmationModal({game, toggleModal, onConfirm}: {
    game: AdminPanelGame | null, toggleModal: () => void, onConfirm: (id: string) => void
}) {

    const handleConfirm = useCallback(() => {
        if (game) {
            toggleModal();
            onConfirm(game.id)
        }
    }, [game, onConfirm]);

    return <Modal visible={!!game} toggleModal={toggleModal} clName="conf-modal">
        <div className={classes['conf-text']}>
            {game ? <>Вы уверены, что хотите удалить игру <br/><span className="b">{getLongDay(game.day)} {game.time}</span>?</> :
            'Вы уверены, что хотите удалить игру?'}
        </div>
        <div className="center">
            <button type="button" className="btn" onClick={handleConfirm}>Подтвердить</button>
            <button type="button" className="btn" onClick={toggleModal}>Отменить</button>
        </div>
    </Modal>
}