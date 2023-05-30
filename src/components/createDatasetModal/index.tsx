import { useRef } from 'react';

import CustomSelect, { CustomCreatableSelect } from '../select';

import ActionPopup from '../ui/modals/actionPopup/actionPopup';
import FileUpload from '../fileUpload';

import classes from './styles.module.css';

type CreateDatasetModalProps = {
    onClose: () => void;
}

const datasetTypeOptions = [
    { value: 'images', label: 'Images' },
    { value: 'text', label: 'Text' },
    { value: 'video', label: 'Video' },
];

export default function CreateDatasetModal(props: CreateDatasetModalProps) {
    const nameRef = useRef({} as HTMLInputElement);
    const descriptionRef = useRef({} as HTMLTextAreaElement);
    const fileRef = useRef({} as HTMLInputElement);

    return (
        <ActionPopup blurBg={ true } popupTitle="Create New Dataset" onClose={ props.onClose }>
            <form className={ classes.createDatasetContainer }>
                <div className={ classes.formContainer }>
                    <input ref={ nameRef } className={ classes.nameInp } type="text" placeholder="Dataset Name" />
                    
                    <textarea ref={ descriptionRef } placeholder="Dataset Description" />

                    <FileUpload ref={ fileRef } />

                    <div className={ classes.recipeContainer }>
                        <h1 className={ classes.recipeHeader }>Choose a Recipe</h1>
                        
                        <CustomSelect className={ classes.select } placeholder="Recipe" options={ [] } />

                        <p>Add an existing recipe</p>
                    </div>

                    <div className={ classes.bottomContainer }>
                        <div className={ classes.card }>
                            <h1 className={ classes.recipeHeader }>Dataset Type</h1>
                            
                            <CustomSelect className={ classes.select } placeholder="Dataset Type" options={ datasetTypeOptions } />

                            <p>Select the type of data in the dataset</p>
                        </div>

                        <div className={ classes.card }>
                            <h1 className={ classes.recipeHeader }>Tags</h1>
                            
                            <CustomCreatableSelect isMulti={ true } className={ classes.select } placeholder="Tags" />

                            <p>Add a new tag or select from an existing one</p>
                        </div>
                    </div>
                </div>

                <button className={ classes.create }>Create</button>
            </form>
        </ActionPopup>
    );
}
