import classes from './modal.module.css';

type ImageModalProps = {
	displayImage: true;
	image: File;
	message: string;
	closeModal: () => void;
};

type TextModalProps = {
	displayImage: false;
	message: string;
	closeModal: () => void;
};

export type ModalProps = ImageModalProps | TextModalProps;

export default function Modal(props: ModalProps) {
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
