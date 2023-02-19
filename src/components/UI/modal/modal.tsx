import React from 'react';

import classes from './modal.module.css';

export interface ModalProps {
    closeModal: () => void;
    children?: React.ReactNode;
    title: string;
}

export interface FilePreviewProps {
    file: File;
    closeModal: () => void;
}

export interface TextModalProps {
    message: string;
    closeModal: () => void;
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
        <Modal closeModal={ props.closeModal } title="Error!">
            <p>{ props.message }</p>
        </Modal>
    );
}

export function FilePreview(props: FilePreviewProps) {
    const [url, setUrl] = React.useState('');

    React.useEffect(() => {
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
