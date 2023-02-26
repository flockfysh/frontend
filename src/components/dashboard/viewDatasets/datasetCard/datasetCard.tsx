import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

import LinkUnderline from '../../../UI/linkUnderline/linkUnderline';
import { ConfirmModal } from '../../../UI/modal/modal';

import Button from '../../../UI/button/button';
import classes from './datasetCard.module.css';

export default function DatasetCard(props: { dataset: PartialDataset, onDelete: (id: string) => Promise<void> }) {
    const [errorMessage, setErrorMessage] = useState('');

    function closeModal() {
        setErrorMessage('');
    }

    function confirm() {
        props.onDelete(props.dataset.id);
    }

    return (
        <li className={ classes.cardContainer }>
            {
                errorMessage ? (
                    <ConfirmModal title="Are you sure you want to delete this dataset?" confirm={ confirm } closeModal={ closeModal }>
                        <></>
                    </ConfirmModal>
                ) : <></>
            }

            <div className={ classes.cardHeader }>

                <h2 className={ classes.datasetName }>
                    { props.dataset.name }
                </h2>
                <Button className={ classes.deleteButton } onClick={ () => setErrorMessage('Are you sure you want to delete this dataset?') }>
                    <FaTrash className={ classes.trashIcon } />
                </Button>
            </div>

            <p className={ classes.overview }>{ props.dataset.description }</p>

            <div className={ classes.cardBottom }>
                <LinkUnderline
                    className={ classes.viewDatasetLink }
                    to={ `/dashboard/${ props.dataset.id }/overview/` }
                    text="View dataset"
                />

                <span>{ props.dataset.numImages } Images</span>
            </div>
        </li>
    );
}
