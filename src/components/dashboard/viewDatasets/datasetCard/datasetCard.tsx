import LinkUnderline from '../../../UI/linkUnderline/linkUnderline';

import { FaTrash } from 'react-icons/fa';

import classes from './datasetCard.module.css';

export default function DatasetCard(props: { dataset: Dataset }) {
	return (
		<div className={classes.datasetContainer}>
			<div className={classes.cardContainer}>
				<FaTrash className={classes.trashIcon}></FaTrash>

				<h1>{props.dataset.name} dataset</h1>

				<p className={classes.overview}>{props.dataset.overview}</p>

				<div className={classes.cardBottom}>
					<LinkUnderline
						to={`/dashboard/${props.dataset.id}/overview/`}
						text="View dataset"
					/>

					<h4>{props.dataset.numImages} Images</h4>
				</div>
			</div>
		</div>
	);
}
