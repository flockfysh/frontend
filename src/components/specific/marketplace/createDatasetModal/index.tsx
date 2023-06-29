import { useState, useRef, useContext, useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import Link from 'next/link';

import CustomSelect, { CustomCreatableSelect } from '@/components/ui/input/select';
import FileUpload from '@/components/fileUpload';

import { ErrorContext } from '@/contexts/errorContext';

import api from '@/helpers/api';

import xmark from '@/icons/xmark.svg';
import save from '@/icons/main/save.svg';
import coinStack from '@/icons/main/coin-stack.svg';

import classes from './styles.module.css';

type CreateDatasetModalProps = {
    onClose: () => void;
}

const datasetTypeOptions = [
    { value: 'image', label: 'Images' },
    { value: 'text', label: 'Text' },
    { value: 'video', label: 'Video' },
];

// ! Look at this
const licenseOptions = [
    { value: 'image', label: 'Images' },
    { value: 'text', label: 'Text' },
    { value: 'video', label: 'Video' },
];

export default function CreateDatasetModal(props: CreateDatasetModalProps) {
    const { throwError } = useContext(ErrorContext);

    const [recipes, setRecipes] = useState<Flockfysh.RecipeWithLabels[]>([]);

    useEffect(() => {
        async function load() {
            const recipes = (await api.get<Api.Response<Flockfysh.RecipeWithLabels[]>>('/api/recipes/search', {
                params: {
                    name: undefined,
                    expand: 'labels',
                }
            })).data.data;
            
            setRecipes(recipes);
        }

        load().then();
    }, []);

    const [isUpload, updateIsUpload] = useState(true);
    const [newDatasetOptions, updateOptions] = useState(
        {
            private: false,
            contributions: true,
            annotations: true
        }
    );

    const datasetName = useRef({} as HTMLInputElement);
    
    const datasetType = useRef();
    const datasetTags = useRef();
    const recipe = useRef();

    const numDatasetImgs = useRef({} as HTMLInputElement);

    const datasetDescriptionOrInstructions = useRef({} as HTMLTextAreaElement);
    const fileExamplesOrImgs = useRef({} as HTMLInputElement);
    const datasetCostOrReward = useRef({} as HTMLInputElement);

    const license = useRef();
    const datasetDeadline = useRef({} as HTMLInputElement);

    const [isAgreed, updateAgreed] = useState(false);

    // TODO: recipe select

    async function uploadDataset() {
        const type = (datasetType.current! as any).state.ariaSelection.value.value;
        const recipeV = (recipe.current! as any).state.ariaSelection.value.value;

        if(!type) return throwError('Please select a dataset type');

        const data = {
            recipe: recipeV,
            type: type,
            name: datasetName.current.value,
            description: datasetDescriptionOrInstructions.current.value,
            tags: (datasetTags.current! as any).state.ariaSelection.value.map(
                (v: {label: string, value: string}) => v.value
            ),
            visibility: newDatasetOptions.private ? true : false,
            price: Number(datasetCostOrReward.current.value)
        }

        const res = await api.post('/api/datasets', data);

        if(res.status === 200) props.onClose();
        else throwError(res.data.message);
    }

    // TODO: Is this implemented?
    async function requestDataset() {

    }

    // TODO: need to fix modal w/ file uplaods

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(isUpload) uploadDataset();
        else requestDataset();
    }

    return (
        <div
            className={ `${ classes.overlay } ${ classes.blurBg }` }
            onClick={ e => {
                if (e.target === e.currentTarget) props.onClose();
            } }
        >
            <div className={ classes.container }>
                <div className={ classes.header }>
                    <h1 className={ classes.headerText }>{ isUpload ? 'Upload Datasets' : 'Request Datasets' }</h1>
                
                    <ReactSVG src={ xmark.src } onClick={ props.onClose } className={ classes.closeBtn } />
                </div>

                <div className={ classes.changeType }>
                    <div onClick={ () => updateIsUpload(true) } className={ classes.leftBtn + ' ' + classes.changeTypeBtn + ' ' + (isUpload ? classes.selected : '') }>
                        Upload
                    </div>

                    <div onClick={ () => updateIsUpload(false) } className={ classes.rightBtn + ' ' + classes.changeTypeBtn + ' ' + (!isUpload ? classes.selected : '') }>
                        Request
                    </div>
                </div>

                <form className={ classes.form } onSubmit={ submit }>
                    <div className={ classes.firstRowContainer }>
                        <label>
                            <p>Enter the name for your Dataset</p>

                            <input
                                type="text"
                                placeholder="XYZ Dataset..."
                                className={ classes.nameContainer }
                                ref={ datasetName }
                                required={ true }
                            />
                        </label>

                        <label>
                            <>
                                <p>Datatype</p>

                                <CustomSelect
                                    name="type"
                                    classNames={
                                        {
                                            control: () => {
                                                return classes.inputControl;
                                            },
                                            option: () => {
                                                return classes.selectOption;
                                            },
                                            menu: () => {
                                                return classes.selectMenu;
                                            }
                                        }
                                    }
                                    placeholder="Dataset Type"
                                    options={ datasetTypeOptions }
                                    ref={ datasetType }
                                />
                            </>
                        </label>

                        <label>
                            {
                                isUpload ? (
                                    <>
                                        <p>Tags</p>

                                        <CustomCreatableSelect
                                            name="tags"
                                            isMulti={ true }
                                            classNames={
                                                {
                                                    control: () => {
                                                        return classes.createableSelectControl + ' ' + classes.inputControl;
                                                    },
                                                    menu: () => {
                                                        return classes.selectMenu;
                                                    }
                                                }
                                            }
                                            placeholder="Tags"
                                            ref={ datasetTags }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p>Minimum Number of Items</p>

                                        { /* TODO: need to change the scroll. React select */ }
                                        <input type="number" ref={ numDatasetImgs } required={ true } />
                                    </>
                                )
                            }
                        </label>

                        {
                            isUpload && (
                                <label>
                                    <p>Recipe</p>
    
                                    <CustomSelect
                                        name="recipe"
                                        classNames={
                                            {
                                                control: () => {
                                                    return classes.inputControl;
                                                },
                                                option: () => {
                                                    return classes.selectOption;
                                                },
                                                menu: () => {
                                                    return classes.selectMenu;
                                                }
                                            }
                                        }
                                        placeholder="Recipe"
                                        ref={ recipe }
                                        options={
                                            recipes.map(
                                                recipe => (
                                                    {
                                                        value: recipe._id,
                                                        label: `${ recipe.name } - ${ recipe.labels.length } labels`
                                                    }
                                                )
                                            )
                                        }
                                    />
                                </label>
                            )
                        }
                    </div>

                    <div className={ classes.rowContainer }>
                        <label>
                            {
                                isUpload ? (
                                    <>
                                        <p>Short description of your dataset</p>

                                        <textarea
                                            placeholder="What it contains, what it can be used for, where did the data come from ...."
                                            ref={ datasetDescriptionOrInstructions }
                                            required={ true }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p>Instruction for dataset</p>

                                        <textarea
                                            placeholder="Explain your use case, what kind of data you use. Please try to be specific as possible to ensure the highest quality of data."
                                            ref={ datasetDescriptionOrInstructions }
                                            required={ true }
                                        />
                                    </>
                                )
                            }
                        </label>

                        <label>
                            {
                                isUpload ? (
                                    <p>Upload Dataset</p>
                                ) : (
                                    <p>Samples (Optional)</p>
                                )
                            }

                            <FileUpload
                                uploadContainerClassName={ `${ classes.uploadContainer }` }
                                ref={ fileExamplesOrImgs }
                            />
                        </label>
                    </div>

                    <div className={ classes.rowContainer }>
                        <label>
                            {
                                isUpload ? (
                                    <p>Premium Dataset? (Optional)</p>
                                ) : (
                                    <p>Reward</p>
                                )
                            }

                            <input type="number" placeholder="Amount.." ref={ datasetCostOrReward } required={ true } />
                        </label>

                        <label>
                            { /* TODO: Add info tooltip */ }
                            <p>Visibility</p>
                        
                            <div className={ classes.changeType + ' ' + classes.labelChangeType }>
                                <div
                                    className={ classes.leftBtn + ' ' + classes.changeTypeBtn + ' ' + (!newDatasetOptions.private ? classes.selected : '') }
                                    onClick={
                                        () => {
                                            updateOptions(
                                                {
                                                    ...newDatasetOptions,
                                                    private: false
                                                }
                                            );
                                        }
                                    }
                                >
                                    Public
                                </div>

                                <div
                                    className={ classes.rightBtn + ' ' + classes.changeTypeBtn + ' ' + (newDatasetOptions.private ? classes.selected : '') }
                                    onClick={
                                        () => {
                                            updateOptions(
                                                {
                                                    ...newDatasetOptions,
                                                    private: true
                                                }
                                            );
                                        }
                                    }
                                >
                                    Private
                                </div>
                            </div>
                        </label>

                        <label>
                            {
                                isUpload ? <p>Contributions?</p> : <p>Annotations</p>
                            }
                        
                            <div className={ classes.changeType + ' ' + classes.labelChangeType }>
                                <div
                                    className={ classes.leftBtn + ' ' + classes.changeTypeBtn + ' ' + ((isUpload ? newDatasetOptions.contributions : newDatasetOptions.annotations) ? classes.selected : '') }
                                    onClick={
                                        () => (
                                            isUpload ? updateOptions(
                                                {
                                                    ...newDatasetOptions,
                                                    contributions: true
                                                }
                                            ) : updateOptions(
                                                {
                                                    ...newDatasetOptions,
                                                    annotations: true
                                                }
                                            )
                                        )
                                    }
                                >
                                    Yes
                                </div>

                                <div
                                    className={ classes.rightBtn + ' ' + classes.changeTypeBtn + ' ' + (!(isUpload ? newDatasetOptions.contributions : newDatasetOptions.annotations) ? classes.selected : '') }
                                    onClick={
                                        () => (
                                            isUpload ? updateOptions(
                                                {
                                                    ...newDatasetOptions,
                                                    contributions: false
                                                }
                                            ) : updateOptions(
                                                {
                                                    ...newDatasetOptions,
                                                    annotations: false
                                                }
                                            )
                                        )
                                    }
                                >
                                    No
                                </div>
                            </div>
                        </label>

                        <label>
                            {
                                isUpload ? (
                                    <>
                                        <p>License</p>

                                        <CustomSelect
                                            name="item"
                                            classNames={
                                                {
                                                    control: () => {
                                                        return classes.inputControl;
                                                    },
                                                    option: () => {
                                                        return classes.selectOption;
                                                    },
                                                    menu: () => {
                                                        return classes.selectMenu;
                                                    }
                                                }
                                            }
                                            placeholder="Item"
                                            options={ licenseOptions }
                                            ref={ license }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p>Deadline</p>

                                        { /* TODO: need to change the icon color */ }
                                        <input type="date" ref={ datasetDeadline } required={ true } />
                                    </>
                                )
                            }
                        </label>
                    </div>

                    <div className={ classes.rowContainer }>
                        <div className={ classes.checkBox }>
                            <input checked={ isAgreed } required={ true } type="checkbox" onChange={ (e) => updateAgreed(e.target.checked) } />

                            {
                                isUpload ? (
                                    <p>I have the rights to publish this media, and understand it will be shared in the data exchange.</p>
                                ) : (
                                    <p className={ classes.pLinkContainer }>
                                        I agree to the flockfysh`&apos;s
                                        <Link className={ classes.link } href="">Terms of Service</Link>
                                        and
                                        <Link className={ classes.link } href="">Privacy Policy</Link>
                                    </p>
                                )
                            }
                        </div>

                        <button type="submit" className={ classes.submit } disabled={ !isAgreed }>
                            {
                                isUpload ? (
                                    <>
                                        <p>Save Dataset</p>

                                        <ReactSVG src={ save.src } />
                                    </>
                                ) : (
                                    <>
                                        <p>Request Dataset</p>

                                        <ReactSVG src={ coinStack.src } />
                                    </>
                                )
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
