import { MouseEvent } from "react";
import Modal from "../ui/modal";
import classes from './img-modal.module.css';

export default function ImgModal({visible, toggleModal, src}: {
    visible: boolean, toggleModal: (e: MouseEvent) => void, src: string
}) {
        return <Modal visible={visible} toggleModal={toggleModal} modalId="img-modal" clName="img-modal">
            <div className={classes.cont}>
                <img src={src} alt="" />
            </div>
        </Modal>
    }