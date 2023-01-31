import { FaTrash } from 'react-icons/fa';

import LinkUnderline from '../../../UI/linkUnderline/linkUnderline';

import classes from './datasetCard.module.css';

export default function DatasetCard(props: { dataset: PartialDataset }) {
    return (
        <div className={ classes.cardContainer }>
            <FaTrash className={ classes.trashIcon } />

            <h2>{ props.dataset.name } dataset</h2>

            <p className={ classes.overview }>{ props.dataset.description }</p>

            <div className={ classes.cardBottom }>
                <LinkUnderline 
                    className={ classes.viewDatasetLink }
                    to={ `/dashboard/${ props.dataset.id }/overview/` }
                    text="View dataset"
                />

                <span>{ props.dataset.itemCount } Images</span>
            </div>
        </div>
    );
}
