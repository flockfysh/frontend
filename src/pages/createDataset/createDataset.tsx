import React, {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

import Loading from '../../components/loading/loading';

import Modal, {ErrorModal} from '../../components/UI/modal/modal';
import {ModalProps} from '../../components/UI/modal/modal';

import CustomSelect from "../../components/UI/input/selectInput";
import classes from './createDataset.module.css';
import MultiFileInput from "../../components/UI/input/multiFileInput/multiFileInput";
import {massZip} from "../../helpers/zip";
import Button from "../../components/UI/button/button";

type ModalSettings = ModalProps & { display: boolean };

export default function CreateDataset() {
    const navigate = useNavigate();

    const [isLoading, updateLoading] = useState(false);

    const [datasetType, updateDatasetType] = useState('images');
    const [images, updateImages] = useState([] as File[]);

    const [errorMessage, setErrorMessage] = React.useState("");

    const formRef = React.useRef<HTMLFormElement | null>(null);

    function updateType(type: string) {
        updateDatasetType(type);
    }

    function createDataset(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!formRef.current) {
            throw new Error("Missing form element!");
        }
        const form = formRef.current;
        const fd = new FormData(form);
        const files = fd.getAll("files") as File[];
        massZip(files);

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
                <Button
                    className={datasetType === 'images' ? classes.selected : ''}
                    onClick={() => updateType('images')}
                >
                    Images
                </Button>

                <Button
                    disabled={true}
                    className={datasetType === 'text' ? classes.selected : ''}
                    onClick={() => updateType('text')}
                >
                    Text
                </Button>

                <Button
                    disabled={true}
                    className={datasetType === 'other' ? classes.selected : ''}
                    onClick={() => updateType('other')}
                >
                    Other
                </Button>
            </div>

            <form className={classes.datasetSecondRow} ref={formRef} onSubmit={createDataset}>
                <div className={classes.labelledInputContainer}>
                    <label htmlFor="name" className={classes.labelledInputContainer__label}>Name of Dataset</label>
                    <input id="name" name="name" type="text"
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
                                    name="files"></MultiFileInput>
                </div>
                <div className={classes.submitButtonContainer}>
                    <button type={"submit"}>Create Dataset</button>
                </div>
            </form>
        </div>
    );
}
