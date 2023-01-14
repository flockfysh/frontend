import LinkUnderline from '../../../UI/linkUnderline/linkUnderline';

import { FaTrash } from 'react-icons/fa';

import classes from './datasetCard.module.css';

export default function DatasetCard(props: { dataset: Dataset }) {
  return (
    <div className={ classes.datasetContainer }>
      <div className={ classes.cardContainer }>
        <FaTrash className={ classes.trashIcon }></FaTrash>

        <h2>{ props.dataset.name } dataset</h2>

        <p className={ classes.overview }>{ props.dataset.overview }</p>

        <div className={ classes.cardBottom }>
          <LinkUnderline className={classes.viewDatasetLink}
            to={ `/dashboard/${ props.dataset.id }/overview/` }
            text="View dataset"
          />
          <span>{ props.dataset.numImages } Images</span>
        </div>
      </div>
    </div>
  );
}
