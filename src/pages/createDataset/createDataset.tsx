import React, {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

import Loading from '../../components/loading/loading';

import Modal, {ErrorModal} from '../../components/UI/modal/modal';
import {ModalProps} from '../../components/UI/modal/modal';

import CustomSelect from "../../components/UI/input/selectInput";
import classes from './createDataset.module.css';
import MultiFileInput from "../../components/UI/input/multiFileInput/multiFileInput";

type ModalSettings = ModalProps & { display: boolean };

export default function CreateDataset() {
    const navigate = useNavigate();

    const [isLoading, updateLoading] = useState(false);

    const [datasetType, updateDatasetType] = useState('images');
    const [images, updateImages] = useState([] as File[]);

    const [errorMessage, setErrorMessage] = React.useState("");

    const datasetName = useRef({} as HTMLInputElement);
    const pricingPlan = useRef({} as HTMLSelectElement);

    function updateType(type: string) {
        updateDatasetType(type);
    }

    function createDataset() {
        if (datasetName.current.value.length === 0) {
            setErrorMessage('Dataset name can\'t be empty.');
            return;
        } else if (pricingPlan.current.value.length === 0) {
            setErrorMessage('You need to select a pricing plan.');
            return;
        } else if (images.length !== 50) {
            setErrorMessage('Need to upload exactly 50 images.');
            return;
        }

        updateLoading(true);

        (async function () {
        })();
    }

    function closeModal() {
        setErrorMessage("");
    }

    if (isLoading) return <Loading/>;

    return (
        <div className={classes.createDatasetContainer}>
            {
                errorMessage ? <ErrorModal message={errorMessage} closeModal={closeModal}/> : <></>
            }

            <h1>Create a new Dataset</h1>

            <div className={classes.datasetTypeRow}>
                <button
                    className={datasetType === 'images' ? classes.selected : ''}
                    onClick={() => updateType('images')}
                >
                    Images
                </button>

                <button
                    disabled={true}
                    className={datasetType === 'text' ? classes.selected : ''}
                    onClick={() => updateType('text')}
                >
                    Text
                </button>

                <button
                    disabled={true}
                    className={datasetType === 'other' ? classes.selected : ''}
                    onClick={() => updateType('other')}
                >
                    Other
                </button>
            </div>

            <div className={classes.datasetSecondRow}>
                <div className={classes.labelledInputContainer}>
                    <label htmlFor="name" className={classes.labelledInputContainer__label}>Name of Dataset</label>
                    <input ref={datasetName} id="name" name="name" type="text"
                           className={classes.labelledInputContainer__input}/>
                </div>

                <div className={classes.labelledInputContainer}>
                    <label htmlFor="pricingPlan" className={classes.labelledInputContainer__label}>Pricing plan</label>
                    <CustomSelect id="pricingPlan" name="tier" className={classes.labelledInputContainer__input}
                                  required={true}
                                  options={[
                                      {label: "Free forever", value: "free"},
                                      {label: "Hobbyist", value: "premium1"},
                                      {label: "Professional", value: "premium2"}
                                  ]}
                                  defaultValue={{label: "Free forever", value: "free"}}/>
                </div>

                <div className={classes.labelledInputContainer}>
                    <label htmlFor="addImagesInput" className={classes.labelledInputContainer__label}>Upload
                        images</label>
                    <MultiFileInput buttonLabel={"Add images"}
                                    name="files"
                                    accept={"image/jpeg,image/jpg,image/webp,image/png"}></MultiFileInput>
                </div>
            </div>

            <div className={classes.createDatasetButtonContainer}>
                <button onClick={createDataset}>Create Dataset</button>
            </div>
        </div>
    );
}
