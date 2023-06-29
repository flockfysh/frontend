import { useState } from 'react';
import { ReactSVG } from 'react-svg';

import Link from 'next/link';

import CustomSelect, { CustomCreatableSelect } from '@/components/ui/input/select';
import FileUpload from '@/components/fileUpload';

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
    const [isUpload, updateIsUpload] = useState(true);
    const [newDatasetOptions, updateOptions] = useState(
        {
            private: false,
            contributions: true,
            annotations: true
        }
    );

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

                <form className={ classes.form }>
                    <div className={ classes.rowContainer }>
                        <label>
                            <p>Enter the name for your Dataset</p>

                            <input type="text" placeholder="XYZ Dataset..." className={ classes.nameContainer } />
                        </label>

                        <div className={ classes.firstRowSecondHalfContainer }>
                            <label>
                                <>
                                    <p>Datatype</p>

                                    <CustomSelect
                                        required={ true }
                                        name="type"
                                        classNames={
                                            {
                                                control: () => {
                                                    return classes.inputControl;
                                                },
                                                option: () => {
                                                    return classes.selectOption;
                                                }
                                            }
                                        }
                                        placeholder="Dataset Type"
                                        options={ datasetTypeOptions }
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
                                                        }
                                                    }
                                                }
                                                placeholder="Tags"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <p>Minimum Number of Items</p>

                                            { /* TODO: need to change the scroll. React select */ }
                                            <input type="number" />
                                        </>
                                    )
                                }
                            </label>
                        </div>
                    </div>

                    <div className={ classes.rowContainer }>
                        <label>
                            {
                                isUpload ? (
                                    <>
                                        <p>Short description of your dataset</p>

                                        <textarea
                                            placeholder="What it contains, what it can be used for, where did the data come from ...."
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p>Instruction for dataset</p>

                                        <textarea
                                            placeholder="Explain your use case, what kind of data you use. Please try to be specific as possible to ensure the highest quality of data."
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

                            <input type="number" placeholder="Amount.." />
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
                                            required={ true }
                                            name="type"
                                            classNames={
                                                {
                                                    control: () => {
                                                        return classes.inputControl;
                                                    },
                                                    option: () => {
                                                        return classes.selectOption;
                                                    }
                                                }
                                            }
                                            placeholder="Item"
                                            options={ licenseOptions }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p>Deadline</p>

                                        { /* TODO: need to change the icon color */ }
                                        <input type="date" />
                                    </>
                                )
                            }
                        </label>
                    </div>

                    <div className={ classes.rowContainer }>
                        <div className={ classes.checkBox }>
                            <input type="checkbox" />

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

                        <button className={ classes.submit }>
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
