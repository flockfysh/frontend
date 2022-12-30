import { Link, useParams } from 'react-router-dom';

import classes from './sideBar.module.css';

export default function SideBar(props: { name: string; page: string }) {
	const { datasetId } = useParams();

	return (
		<nav className={classes.eachDatasetSideContainer}>
			<h1>{props.name} Dataset</h1>

			<ul>
				<Link
					to={`/dashboard/${datasetId}/overview/`}
					className={
						props.page === 'overview'
							? classes.linkColored + ' ' + classes.link
							: classes.link
					}
				>
					Overview
				</Link>

				<Link
					to={`/dashboard/${datasetId}/uploaded-images/`}
					className={
						props.page === 'uploaded-images'
							? classes.linkColored + ' ' + classes.link
							: classes.link
					}
				>
					Uploaded Images
				</Link>

				<Link
					to={`/dashboard/${datasetId}/dataset-images/`}
					className={
						props.page === 'dataset-images'
							? classes.linkColored + ' ' + classes.link
							: classes.link
					}
				>
					Dataset
				</Link>

				<Link
					to={`/dashboard/${datasetId}/settings/`}
					className={
						props.page === 'settings'
							? classes.linkColored + ' ' + classes.link
							: classes.link
					}
				>
					Settings
				</Link>
			</ul>
		</nav>
	);
}
