import React, { useRef } from 'react';
import CustomSelect, { CustomCreatableSelect } from '../../../ui/input/select';
import api from '@/helpers/api';
import { formToJSON } from 'axios';
import ActionPopupWithButton from '@/components/ui/modals/ActionPopupWithButton';
import { PopupModalContext } from '@/components/ui/modals/ActionPopup';
import plus from '@/icons/main/plus-circle.svg';
import classes from './styles.module.css';
import { ReactSVG } from 'react-svg';


const datasetTypeOptions = [
    { value: 'image', label: 'Images' },
    { value: 'text', label: 'Text' },
    { value: 'video', label: 'Video' },
];

export default function CreateDatasetModal() {
    return (
        <ActionPopupWithButton button={ (
            <button className={ classes.newDatasetButton }><span>New Dataset</span><ReactSVG src={ plus.src }></ReactSVG>
            </button>
        ) } blurBg={ true }
                               popupTitle="Create New Dataset">
            <CreateDatasetForm></CreateDatasetForm>
        </ActionPopupWithButton>
    );
}

function CreateDatasetForm() {
    const [recipes, setRecipes] = React.useState<Flockfysh.RecipeWithLabels[]>([]);
    const [curQuery, setCurQuery] = React.useState<string | undefined>();
    const { close } = React.useContext(PopupModalContext);

    React.useEffect(() => {
        async function load() {
            const recipes = (await api.get<Api.Response<Flockfysh.RecipeWithLabels[]>>('/api/recipes/search', {
                params: {
                    name: curQuery || undefined,
                    expand: 'labels',
                }
            })).data.data;
            setRecipes(recipes);
        }

        load().then();
    }, [curQuery]);

    async function createDataset(elem: HTMLFormElement) {
        const fd = formToJSON(elem) as {
            name: string;
            description: string;
            tags: string | string[];
            recipe: string;
            type: string;
        };
        if (typeof fd.tags === 'string') {
            fd.tags = [fd.tags];
        }
        await api.post('/api/datasets', fd);
    }

    return (
        <form className={ classes.createDatasetContainer } onSubmit={ e => {
            e.preventDefault();
            createDataset(e.currentTarget).then(() => {
                close();
            });
        } }>
            <div className={ classes.formContainer }>
                <input required={ true } name={ 'name' } className={ classes.nameInp } type="text"
                       placeholder="Dataset Name" onChange={ (e) => setCurQuery(e.currentTarget.value) }/>

                <textarea className={ classes.descInput } required={ true } name={ 'description' }
                          placeholder="Dataset Description"/>

                <div className={ classes.recipeContainer }>
                    <h1 className={ classes.recipeHeader }>Choose a Recipe</h1>

                    <CustomSelect className={ classes.select } name={ 'recipe' } placeholder="Recipe"
                                  options={ recipes.map(recipe => {
                                      return {
                                          value: recipe._id,
                                          label: `${recipe.name} - ${recipe.labels.length} labels`,
                                      };
                                  }) } required={ true }/>

                    <p>Add an existing recipe</p>
                </div>

                <div className={ classes.bottomContainer }>
                    <div className={ classes.card }>
                        <h1 className={ classes.recipeHeader }>Dataset Type</h1>

                        <CustomSelect required={ true } name={ 'type' } className={ classes.select }
                                      placeholder="Dataset Type"
                                      options={ datasetTypeOptions }/>

                        <p>Select the type of data in the dataset</p>
                    </div>

                    <div className={ classes.card }>
                        <h1 className={ classes.recipeHeader }>Tags</h1>

                        <CustomCreatableSelect name={ 'tags' } isMulti={ true }
                                               className={ classes.select }
                                               placeholder="Tags"/>

                        <p>Add a new tag or select from an existing one</p>
                    </div>
                </div>
                <button className={ classes.create }>Create</button>
            </div>


        </form>
    );
}
