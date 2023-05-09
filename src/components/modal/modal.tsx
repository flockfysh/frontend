import { useState, useEffect } from 'react';

import classes from './modal.module.css';

export interface ModalProps {
    closeModal: () => void;
    children?: React.ReactNode;
    title: string;
}

export interface ConfirmModalProps extends ModalProps {
    confirm: () => void;
}

export interface FilePreviewProps {
    file: File;
    closeModal: () => void;
}

export interface TextModalProps {
    title?: string;
    message: string;
    closeModal: () => void;
}

export function ConfirmModal(props: ConfirmModalProps) {
    function confirm() {
        props.confirm();
        props.closeModal();
    }

    return (
        <div className={ classes.modalContainer }>
            <div className={ classes.modalContent }>
                <h4 className={ classes.modalTitle }>{ props.title }</h4>

                { props.children }

                <div className={ classes.buttonContainer }>
                    <button onClick={ confirm } className={ classes.closeModal }>Yes</button>
                    <button onClick={ props.closeModal } className={ classes.closeModal }>No</button>
                </div>
            </div>
        </div>
    );
}

export default function Modal(props: ModalProps) {
    return (
        <div className={ classes.modalContainer }>
            <div className={ classes.modalContent }>
                <h4 className={ classes.modalTitle }>{ props.title }</h4>

                { props.children }

                <button onClick={ props.closeModal } className={ classes.closeModal }>Ok</button>
            </div>
        </div>
    );
}

export function ErrorModal(props: TextModalProps) {
    return (
        <Modal closeModal={ props.closeModal } title={ props.title ?? 'Error' }>
            <p>{ props.message }</p>
        </Modal>
    );
}

export function FilePreview(props: FilePreviewProps) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        const newUrl = URL.createObjectURL(props.file);
        
        setUrl(newUrl);

        return () => {
            URL.revokeObjectURL(newUrl);
        };
    }, []);

    return (
        <Modal title={ props.file.name } closeModal={ props.closeModal }>
            <div className={ classes.imageContainer }>
                <img src={ url } alt={ props.file.name } className={ classes.image }/>
            </div>
        </Modal>
    );
}
