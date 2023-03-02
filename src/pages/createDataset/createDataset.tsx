import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorModal } from '../../components/UI/modal/modal';
import CustomSelect, { CustomCreatableSelect } from '../../components/UI/input/selectInput';
import classes from './createDataset.module.css';
import MultiFileInput from '../../components/UI/input/multiFileInput/multiFileInput';
import Button from '../../components/UI/button/button';
import AsyncArray from '../../helpers/async';
import api from '../../helpers/api';
import Textarea from '../../components/UI/input/textarea';
import { ErrorContext } from '../../contexts/errorContext';

export default function CreateDataset() {
    const navigate = useNavigate();
    const { throwError } = useContext(ErrorContext);
    const [datasetType, updateDatasetType] = useState('images');
    const [disabled, setDisabled] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    function updateType(type: string) {
        updateDatasetType(type);
    }

    async function createDataset(e: React.FormEvent<HTMLFormElement>) {
        if(disabled) return;
        setDisabled(true);
        e.preventDefault();
        if (!formRef.current) throw new Error('Missing form element!');
        const fd = new FormData(formRef.current);

        const files = new AsyncArray(fd.getAll('files') as File[]);

        if(files.length === 1 && files[0].size === 0) {
            throwError('Please upload a file.');
            
            return;
        }

        // Create a dataset.
        const createDatasetRequestBody: Record<string, any | any[]> = {};

        createDatasetRequestBody.description = fd.get('description');
        createDatasetRequestBody.name = fd.get('name');
        createDatasetRequestBody.classes = fd.getAll('classes');
        createDatasetRequestBody.tier = fd.get('tier');
        createDatasetRequestBody.type = datasetType;

        const response = await api.post('/api/dataset', createDatasetRequestBody);
        const datasetId = response.data.data.id;

        // Start adding images to the dataset.
        const badFiles: string[] = [];

        await files.chunkMap(async (file) => {
            try {
                const fd = new FormData();
                fd.append('image', file);
                await api.post(`/api/image/${ datasetId }`, fd);
            }
            catch (e) {
                badFiles.push(file.name);
            }
        }, undefined);
        if(badFiles.length) {
            let badFileString: string;

            if (badFiles.length <= 5) badFileString = badFiles.join(', ');
            else badFileString = `${ badFiles.slice(0, 5).join(', ') } and ${ badFiles.length - 5 } more`;

            throwError(`These files failed to upload: ${ badFileString }. Please check the dataset for missing files.`);
        }
        else navigate('/dashboard');
    }

    return (
        <div className={ classes.createDatasetContainer }>
            <h1>Create a new Dataset</h1>

            <div className={ classes.datasetTypeRow }>
                <Button
                    className={ datasetType === 'images' ? classes.selected : '' }
                    onClick={ () => updateType('images') }
                >
                    Images
                </Button>

                <Button
                    disabled={ true }
                    className={ datasetType === 'text' ? classes.selected : '' }
                    onClick={ () => updateType('text') }
                >
                    Text
                </Button>

                <Button
                    disabled={ true }
                    className={ datasetType === 'other' ? classes.selected : '' }
                    onClick={ () => updateType('other') }
                >
                    Other
                </Button>
            </div>

            <form className={ classes.datasetSecondRow } ref={ formRef } onSubmit={ createDataset }>
                <div className={ classes.labelledInputContainer }>
                    <label htmlFor="name" className={ classes.labelledInputContainer__label }>Name of Dataset</label>

                    <input 
                        id="name" 
                        name="name" 
                        type="text"
                        className={ classes.labelledInputContainer__input }
                    />
                </div>

                <div className={ classes.labelledInputContainer }>
                    <label htmlFor="name" className={ classes.labelledInputContainer__label }>Dataset Description</label>

                    <Textarea 
                        id="name" 
                        name="description"
                        className={ classes.labelledInputContainer__input }
                    />
                </div>


                <div className={ classes.labelledInputContainer }>
                    <label htmlFor="pricingPlan" className={ classes.labelledInputContainer__label }>Pricing Plan</label>

                    <CustomSelect 
                        id="pricingPlan" 
                        name="tier" 
                        className={ classes.labelledInputContainer__input }
                        required={ true }
                        options={ [
                            { label: 'Free forever', value: 'free' },
                            { label: 'Hobbyist', value: 'premium1' },
                            { label: 'Professional', value: 'premium2' }
                        ] }
                        defaultValue={ { label: 'Free forever', value: 'free' } }
                    />
                </div>

                <div className={ classes.labelledInputContainer }>
                    <label htmlFor="classes" className={ classes.labelledInputContainer__label }>Dataset Labels</label>

                    <CustomCreatableSelect 
                        id="classes" 
                        name="classes" 
                        className={ classes.labelledInputContainer__input }
                        required={ true }
                        isMulti={ true }
                        options={ [] }
                        placeholder="Start typing to create a label..."
                    />
                </div>

                <div className={ classes.labelledInputContainer }>
                    <label 
                    htmlFor="addImagesInput" 
                    className={ classes.labelledInputContainer__label }
                    >
                        Upload images
                    </label>

                    <MultiFileInput
                        accept=".webp, .png, .jpg, .jpeg"
                        buttonLabel="Add images"
                        name="files"
                    />
                </div>

                <div className={ classes.submitButtonContainer }>
                    <button type="submit">Create Dataset</button>
                </div>
            </form>
        </div>
    );
}
