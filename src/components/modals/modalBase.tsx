import classes from './modals.module.css';

export interface ModalProps {
    closeModal: () => void;
    children?: React.ReactNode;
    title: string;
}

export default function ModalBase(props: ModalProps) {
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
