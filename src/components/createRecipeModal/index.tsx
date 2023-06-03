import { useRef, useState } from 'react';

import CustomSelect, { CustomCreatableSelect } from '../select';

import classes from './styles.module.css';
import feather from '@/icons/main/feather.svg';
import link from '@/icons/main/link.svg';
import trash from '@/icons/main/trash-2.svg';
import plusCircle from '@/icons/main/plus-circle.svg';
import CustomModal from '../ui/modals/customModal';
import { ReactSVG } from 'react-svg';

type createRecipeModalProps = {
    onClose: () => void;
}

const COLUMN_DEFAULT = {
  color: '#FFFFFF',
  label: '',
  tool: ''
};

export default function CreateRecipeModal(props: createRecipeModalProps) {
    const [columns, setColumns] = useState([COLUMN_DEFAULT]);
    const nameRef = useRef({} as HTMLInputElement);

    const addColumn = () => {
        setColumns([...columns, COLUMN_DEFAULT]);
    };

    const deleteColumn = (index) => {
        const newColumns = [...columns];
        newColumns.splice(index, 1);
        setColumns(newColumns);
    };

    const updateColumn = (index, value) => {
        const newColumns = [...columns];
        newColumns[index] = value;
        setColumns(newColumns);
    };

    const onSubmit = () => {
        // here on submit action
        props.onClose();
    };

    return (
        <CustomModal blurBg={ true } popupTitle="Create Recipe" onClose={ props.onClose }>
            <form className={ classes.createRecipeContainer }>
                <div className={ classes.formContainer }>
                    <div className={ classes.recipeNameInputWrapper }>
                        <label>Name</label>
                        <div className={ classes.nameInputContainer }>
                          <ReactSVG src={ link.src } className={ classes.nameInputIcon }></ReactSVG>
                          <input type="text" className={ classes.nameInput } placeholder="Recipe Name"/>
                        </div>
                    </div>
                    
                    <div className={ classes.labelsWrapper }>
                        <div className={ classes.labelHeader }>
                            <div className={ classes.labelTitleWrapper }>
                                <ReactSVG src={ feather.src }></ReactSVG>
                                <h2>Labels</h2>
                            </div>
                            <div className={ classes.labelAppendColumnButton } onClick={ () => addColumn() }>
                                <ReactSVG src={ plusCircle.src }></ReactSVG>
                            </div>
                        </div>
                    
                        <div className={ classes.labelColumnsWrapper }>
                            {columns.map((column, index) => (
                                <div key={ index } className={ classes.labelColumnItem }>
                                    <div>
                                        <input 
                                            type="color"
                                            className={ classes.colorInput }
                                            value={ column.color } 
                                            onChange={ (e) => updateColumn(index, { ...column, color: e.target.value }) }
                                        />
                                    </div>

                                    <div>
                                        <input 
                                            placeholder="Label"
                                            type="text"
                                            className={ classes.input }
                                            value={ column.label } 
                                            onChange={ (e) => updateColumn(index, { ...column, label: e.target.value }) }
                                        />
                                    </div>
                                    <div>
                                        <select 
                                            className={ classes.input }
                                            value={ column.tool } 
                                            onChange={ (e) => updateColumn(index, { ...column, tool: e.target.value }) }
                                        >
                                            <option value="tool">Tool</option>
                                        </select>
                                    </div>
                                    <button type="button" className={ classes.columnDeleteButton } onClick={ () => deleteColumn(index) }>
                                        <ReactSVG src={ trash.src }></ReactSVG>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>

                <button onClick={ onSubmit } className={ classes.save }>Save Recipe</button>
            </form>
        </CustomModal>
    );
}
