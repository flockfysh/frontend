import { useRef } from 'react';
import Select from 'react-select';

import ActionPopup from '../modals/actionPopup/actionPopup';
import FileUpload from '../fileUpload';

import classes from './styles.module.css';

export default function CreateDatasetModal() {
    const nameRef = useRef({} as HTMLInputElement);
    const descriptionRef = useRef({} as HTMLTextAreaElement);
    const fileRef = useRef({} as HTMLInputElement);

    return (
        <ActionPopup blurBg={ true } popupTitle="Create New Dataset">
            <form className={ classes.createDatasetContainer }>
                <div className={ classes.formContainer }>
                    <input ref={ nameRef } className={ classes.nameInp } type="text" placeholder="Dataset Name" />
                    
                    <textarea ref={ descriptionRef } placeholder="Dataset Description" />

                    <FileUpload ref={ fileRef } />

                    <div className={ classes.recipeContainer }>
                        <h1 className={ classes.recipeHeader }>Choose a Recipe</h1>
                        
                        <Select
                            styles={
                                {
                                    control: (base, state) => (
                                        {
                                            ...base,
                                            background: 'none',
                                            border: 'none',
                                            borderBottom: '1px solid var(--elements-900)'
                                        }
                                    )
                                }
                            }
                            className={ classes.selectRecipe }
                        />
                    </div>
                </div>

                <button className={ classes.create }>Create</button>
            </form>
        </ActionPopup>
    );
}
