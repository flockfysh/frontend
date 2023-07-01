import { ModalProps } from './modalBase';

import classes from '../modals.module.css';

export interface ConfirmModalProps extends ModalProps {
    confirm: () => void;
}

export function ConfirmModal(props: ConfirmModalProps) {
    function confirm() {
        props.confirm();
        props.closeModal();
    }

    return (
        <div className={classes.modalContainer}>
            <div className={classes.modalContent}>
                <h4 className={classes.modalTitle}>{props.title}</h4>

                {props.children}

                <div className={classes.buttonContainer}>
                    <button onClick={confirm} className={classes.closeModal}>
                        Yes
                    </button>
                    <button
                        onClick={props.closeModal}
                        className={classes.closeModal}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
