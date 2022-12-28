import classes from './modal.module.css';

export default function Modal(props) {
    return (
        <div className={ classes.modalContainer }>
            <div className={ classes.modalContent }>
                {
                    props.displayImage ? (
                        <div className={ classes.imageContainer }>
                            <p>{ props.image.name }</p>
                            <img src={ URL.createObjectURL(props.image) } alt={ props.image.name } />
                        </div>
                    ) : <p>{ props.message }</p>
                }

                <button onClick={ props.closeModal } className={ classes.closeModal }>Ok</button>
            </div>
        </div>
    );
}