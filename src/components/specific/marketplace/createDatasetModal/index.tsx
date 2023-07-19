import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';

import CustomSelect, {
    CustomCreatableSelect,
} from '@/components/ui/input/select';
import FileUpload from '@/components/fileUpload';
import RadioButtons from '@/components/ui/input/radioButtons';

import api from '@/helpers/api';
import AsyncArray from '@/helpers/async';
import { uploadTypeMapping } from '@/helpers/assets/upload';
import { capitalize } from '@/helpers/dataManipulation/strings';

import xmark from '@/icons/xmark.svg';
import save from '@/icons/main/save.svg';
import coinStack from '@/icons/main/coin-stack.svg';

import classes from './styles.module.css';
import {
    DATASET_LICENSE_DESCRIPTION,
    DATASET_LICENSE_ENUM,
} from '@/helpers/enums/license';

type CreateDatasetModalProps = {
    onClose: () => void;
};

const datasetTypeOptions = [
    { value: 'image', label: 'Images' },
    { value: 'text', label: 'Text' },
    { value: 'video', label: 'Video' },
    { value: 'other', label: 'Other' },
];

const licenseOptions = DATASET_LICENSE_ENUM._def.values.map((license) => {
    return {
        label: DATASET_LICENSE_DESCRIPTION[license],
        value: license,
    };
});

async function uploadDataset(formData: FormData) {
    const name = formData.get('name');
    let recipe = formData.get('recipe');
    const type = formData.get('type');

    if (!recipe) {
        const newRecipe = await api
            .post<Api.Response<Flockfysh.Recipe>>('/api/recipes', {
                name: name,
            })
            .then((res) => res.data);

        recipe = newRecipe.data._id;
    }

    const createData = {
        name: name,
        recipe: recipe,
        type: type,
        tags: formData.getAll('tags'),
        description: formData.get('description'),
        price: +(formData.get('price') ?? 0),
        public: JSON.parse(formData.get('public') as string),
        license: formData.get('license'),
    };

    const newDataset = await api
        .post<Api.Response<Flockfysh.Dataset>>('/api/datasets', createData)
        .then((res) => res.data.data);

    const files = formData.getAll('files').filter((file) => {
        if (file instanceof File && file.size > 0) {
            return true;
        }
    }) as File[];

    const config =
        uploadTypeMapping[formData.get('type') as Flockfysh.AssetType];

    async function upload(file: File) {
        try {
            const fd = new FormData();
            fd.set(config.fieldName, file);
            await api.post(
                `/api/datasets/${newDataset._id}/assets/upload/${config.endpoint}`,
                fd,
            );
        }
 catch (e) {
        }
    }

    await new AsyncArray(files).chunkMap((file) => upload(file), undefined, {
        maxThreads: 20,
    });
}

export default function CreateDatasetModal(props: CreateDatasetModalProps) {
    const [datasetType, setDatasetType] = useState<Flockfysh.AssetType | undefined>(undefined);

    const [isFadeOut, updateFadeOut] = useState(false);

    const [isAgreed, updateAgreed] = useState(false);

    const [isUpload, updateIsUpload] = useState(true);

    // TODO: Is this implemented?
    async function requestDataset() {
    }

    requestDataset();

    return (
        <div
            className={ `${classes.overlay} ${classes.blurBg} ${isFadeOut ? classes.fadeOut : ''}` }
            onClick={ (e) => {
                if (e.target === e.currentTarget) props.onClose();
            } }
            onAnimationEnd={
                () => {
                    if (isFadeOut) props.onClose();
                }
            }
        >
            <div
                className={ `${classes.container}` }
            >
                <div className={ classes.header }>
                    <h1 className={ classes.headerText }>
                        { isUpload ? 'Upload Datasets' : 'Build Datasets' }
                    </h1>

                    <ReactSVG
                        src={ xmark.src }
                        onClick={ () => updateFadeOut(true) }
                        className={ classes.closeBtn }
                    />
                </div>

                <div className={ classes.changeType }>
                    <div
                        onClick={ () => updateIsUpload(true) }
                        className={
                            classes.leftBtn +
                            ' ' +
                            classes.changeTypeBtn +
                            ' ' +
                            (isUpload ? classes.selected : '')
                        }
                    >
                        Upload
                    </div>

                    <div
                        onClick={ () => updateIsUpload(false) }
                        className={
                            classes.rightBtn +
                            ' ' +
                            classes.changeTypeBtn +
                            ' ' +
                            (!isUpload ? classes.selected : '')
                        }
                    >
                        Build
                    </div>
                </div>

                <form
                    className={ classes.form }
                    onSubmit={ async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        await uploadDataset(formData);
                        updateFadeOut(true);
                    } }
                >
                    <div className={ classes.rowContainer }>
                        <label>
                            <p>Enter the name for your Dataset</p>

                            <input
                                name={ 'name' }
                                type="text"
                                placeholder="XYZ Dataset..."
                                className={ classes.nameContainer }
                                required={ true }
                            />
                        </label>

                        <label>
                            <>
                                <p>Datatype</p>

                                <CustomSelect
                                    required={ true }
                                    name={ 'type' }
                                    value={
                                        datasetType
                                            ? {
                                                label: capitalize(
                                                    datasetType,
                                                ),
                                                value: datasetType,
                                            }
                                            : undefined
                                    }
                                    onChange={ (newValue) => {
                                        setDatasetType(
                                            (
                                                newValue as {
                                                    value: Flockfysh.AssetType;
                                                }
                                            ).value,
                                        );
                                    } }
                                    classNames={ {
                                        control: () => {
                                            return classes.inputControl;
                                        },
                                        option: () => {
                                            return classes.selectOption;
                                        },
                                        menu: () => {
                                            return classes.selectMenu;
                                        },
                                    } }
                                    placeholder="Dataset Type"
                                    options={ datasetTypeOptions }
                                />
                            </>
                        </label>

                        <label>
                            { isUpload ? (
                                <>
                                    <p>Tags</p>

                                    <CustomCreatableSelect
                                        name={ 'tags' }
                                        isMulti={ true }
                                        classNames={ {
                                            control: () => {
                                                return (
                                                    classes.createableSelectControl +
                                                    ' ' +
                                                    classes.inputControl
                                                );
                                            },
                                            menu: () => {
                                                return classes.selectMenu;
                                            },
                                        } }
                                        placeholder="Tags"
                                    />
                                </>
                            ) : (
                                <>
                                    <p>Minimum Number of Items</p>

                                    { /* TODO: need to change the scroll. React select */ }
                                    <input type="number" required={ true }/>
                                </>
                            ) }
                        </label>
                    </div>

                    <div className={ classes.rowContainer }>
                        <label>
                            { isUpload ? (
                                <>
                                    <p>Short description of your dataset</p>

                                    <textarea
                                        name={ 'description' }
                                        placeholder="What it contains, what it can be used for, where did the data come from ...."
                                        required={ true }
                                    />
                                </>
                            ) : (
                                <>
                                    <p>Instruction for dataset</p>

                                    <textarea
                                        name={ 'description' }
                                        placeholder="Explain your use case, what kind of data you use. Please try to be specific as possible to ensure the highest quality of data."
                                        required={ true }
                                    />
                                </>
                            ) }
                        </label>

                        <label>
                            { isUpload ? (
                                <p>Upload Dataset</p>
                            ) : (
                                <p>Samples (Optional)</p>
                            ) }

                            <FileUpload
                                name={ 'files' }
                                datasetType={ datasetType }
                                uploadContainerClassName={ `${classes.uploadContainer}` }
                            />
                        </label>
                    </div>

                    <div className={ classes.rowContainer }>
                        <label>
                            { isUpload ? (
                                <p>Premium Dataset? (Optional)</p>
                            ) : (
                                <p>Reward</p>
                            ) }

                            <input
                                type="number"
                                placeholder="Amount.."
                                name="price"
                            />
                        </label>

                        <label
                            className={ classes.disablePointerEvents }
                            onClick={ (e) => {
                                e.preventDefault();
                            } }
                        >
                            { /* TODO: Add info tooltip */ }
                            <p>Visibility</p>

                            <RadioButtons
                                options={ [
                                    {
                                        label: 'Private',
                                        value: false,
                                    },
                                    {
                                        label: 'Public',
                                        value: true,
                                    },
                                ] }
                                name={ 'public' }
                                initialValue={ false }
                            />
                        </label>

                        { /*<label>*/ }
                        { /*    {*/ }
                        { /*        isUpload ? <p>Contributions?</p> : <p>Annotations</p>*/ }
                        { /*    }*/ }

                        { /*    <div className={ classes.changeType + ' ' + classes.labelChangeType }>*/ }

                        { /*        <div*/ }
                        { /*            className={ classes.leftBtn + ' ' + classes.changeTypeBtn + ' ' + ((isUpload ? newDatasetOptions.contributions : newDatasetOptions.annotations) ? classes.selected : '') }*/ }
                        { /*            onClick={*/ }
                        { /*                () => (*/ }
                        { /*                    isUpload ? updateOptions(*/ }
                        { /*                        {*/ }
                        { /*                            ...newDatasetOptions,*/ }
                        { /*                            contributions: true,*/ }
                        { /*                        },*/ }
                        { /*                    ) : updateOptions(*/ }
                        { /*                        {*/ }
                        { /*                            ...newDatasetOptions,*/ }
                        { /*                            annotations: true,*/ }
                        { /*                        },*/ }
                        { /*                    )*/ }
                        { /*                )*/ }
                        { /*            }*/ }
                        { /*        >*/ }
                        { /*            Yes*/ }
                        { /*        </div>*/ }

                        { /*        <div*/ }
                        { /*            className={ classes.rightBtn + ' ' + classes.changeTypeBtn + ' ' + (!(isUpload ? newDatasetOptions.contributions : newDatasetOptions.annotations) ? classes.selected : '') }*/ }
                        { /*            onClick={*/ }
                        { /*                () => (*/ }
                        { /*                    isUpload ? updateOptions(*/ }
                        { /*                        {*/ }
                        { /*                            ...newDatasetOptions,*/ }
                        { /*                            contributions: false,*/ }
                        { /*                        },*/ }
                        { /*                    ) : updateOptions(*/ }
                        { /*                        {*/ }
                        { /*                            ...newDatasetOptions,*/ }
                        { /*                            annotations: false,*/ }
                        { /*                        },*/ }
                        { /*                    )*/ }
                        { /*                )*/ }
                        { /*            }*/ }
                        { /*        >*/ }
                        { /*            No*/ }
                        { /*        </div>*/ }
                        { /*    </div>*/ }
                        { /*</label>*/ }

                        <label>
                            { isUpload ? (
                                <>
                                    <p>License</p>

                                    <CustomSelect
                                        name="license"
                                        classNames={ {
                                            control: () => {
                                                return `${classes.inputControl} ${classes.licenseInput}`;
                                            },
                                            option: () => {
                                                return classes.selectOption;
                                            },
                                            menu: () => {
                                                return classes.selectMenu;
                                            },
                                        } }
                                        placeholder="Item"
                                        options={ licenseOptions }
                                        defaultValue={ licenseOptions[0] }
                                    />
                                </>
                            ) : (
                                <>
                                    <p>Deadline</p>

                                    { /* TODO: need to change the icon color */ }
                                    <input type="date" required={ true }/>
                                </>
                            ) }
                        </label>
                    </div>

                    <div className={ classes.rowContainer }>
                        <div className={ classes.checkBox }>
                            <input
                                checked={ isAgreed }
                                required={ true }
                                type="checkbox"
                                onChange={ (e) => updateAgreed(e.target.checked) }
                            />

                            { isUpload ? (
                                <p>
                                    I have the rights to publish this media, and
                                    understand it will be shared in the data
                                    exchange.
                                </p>
                            ) : (
                                <p className={ classes.pLinkContainer }>
                                    I agree to the flockfysh`&apos;s
                                    <Link className={ classes.link } href="">
                                        Terms of Service
                                    </Link>
                                    and
                                    <Link className={ classes.link } href="">
                                        Privacy Policy
                                    </Link>
                                </p>
                            ) }
                        </div>

                        <button
                            type="submit"
                            className={ classes.submit }
                            disabled={ !isAgreed }
                        >
                            { isUpload ? (
                                <>
                                    <p>Save Dataset</p>

                                    <ReactSVG src={ save.src }/>
                                </>
                            ) : (
                                <>
                                    <p>Create Dataset</p>

                                    <ReactSVG src={ coinStack.src }/>
                                </>
                            ) }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
