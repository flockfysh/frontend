import { FaTrash } from 'react-icons/fa';

import LinkUnderline from '../../../UI/linkUnderline/linkUnderline';

import Button from "../../../UI/button/button";
import classes from './datasetCard.module.css';

export default function DatasetCard(props: { dataset: PartialDataset }) {
    return (
<<<<<<< HEAD
        <li className={classes.cardContainer}>
            <div className={classes.cardHeader}>

                <h2 className={classes.datasetName}>
                    {props.dataset.name}
                </h2>
                <Button className={classes.deleteButton}>
                    <FaTrash className={classes.trashIcon}></FaTrash>
                </Button>
            </div>
=======
        <div className={ classes.cardContainer }>
            <FaTrash className={ classes.trashIcon } />

            <h2>{ props.dataset.name } dataset</h2>
>>>>>>> master

            <p className={ classes.overview }>{ props.dataset.description }</p>

            <div className={ classes.cardBottom }>
                <LinkUnderline 
                    className={ classes.viewDatasetLink }
                    to={ `/dashboard/${ props.dataset.id }/overview/` }
                    text="View dataset"
                />

                <span>{ props.dataset.itemCount } Images</span>
            </div>
        </li>
    );
}
