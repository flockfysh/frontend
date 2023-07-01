import ModalBase from './modalBase';

export interface ErrorModalProps {
    title?: string;
    message: string;
    closeModal: () => void;
}

export function ErrorModal(props: ErrorModalProps) {
    return (
        <ModalBase closeModal={props.closeModal} title={props.title ?? 'Error'}>
            <p>{props.message}</p>
        </ModalBase>
    );
}
