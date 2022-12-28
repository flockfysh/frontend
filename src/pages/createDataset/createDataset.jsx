import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import UploadedImage from '../../components/dashboard/createDataset/uploadedImage/uploadedImage';
import Modal from '../../components/dashboard/createDataset/modal/modal';
import Loading from '../../components/loading/loading';

import classes from './createDataset.module.css';

export default function CreateDataset() {
    const navigate = useNavigate();

    const [isLoading, updateLoading] = useState(false);

    const [datasetType, updateDatasetType] = useState('images');
    const [images, updateImages] = useState([]);

    const [modalProps, updateModalProps] = useState(
        {
            display: false
        }
    );

    const datasetName = useRef({});
    const pricingPlan = useRef({});

    function updateType(type) {
        updateDatasetType(type);
    }

    function uploadImages(e) {
        let updatedImages = [];

        for(let f of e.target.files) {
            if(!f.type.includes('png') && !f.type.includes('jpg') && !f.type.includes('webp') && !f.type.includes('jpeg')) {
                alert(`Can only upload images of type png, jpg, or webp. File named ${ f.name } skipped.`);

                continue;
            }

            updatedImages.push(f);
        }

        updateImages([...updatedImages, ...images]);
    }

    function createDataset() {
        if(datasetName.current.value.length === 0) {
            updateModalProps(
                {
                    display: true,
                    message: 'Dataset name can\'t be empty.',
                    displayImage: false
                }
            );

            return;
        }
        else if(pricingPlan.current.value.length === 0) {
            updateModalProps(
                {
                    display: true,
                    message: 'You need to select a pricing plan.',
                    displayImage: false
                }
            );
            
            return;
        }
        else if(images.length !== 50) {
            updateModalProps(
                {
                    display: true,
                    message: 'Need to upload exactly 50 images.',
                    displayImage: false
                }
            );

            return;
        }

        updateLoading(true);

        (async function() {
            // calls to backend

            // navigate('PATH/TO/NEW/Dataset');
        })();
    }

    function deleteImage(index) {
        let updatedImages = [];

        for(let i = 0; i < images.length; i++) {
            if(i === index) continue;

            updatedImages.push(images[i]);
        }

        updateImages([...updatedImages]);
    }

    function closeModal() {
        updateModalProps(
            {
                ...modalProps,
                display: false
            }
        );
    }

    if(isLoading) return <Loading />;

    return (
        <div className={ classes.createDatasetContainer }>
            {
                modalProps.display ? <Modal {...modalProps} closeModal={ closeModal } /> : <></>
            }

            <h1>Create a new Dataset</h1>

            <div className={ classes.datasetTypeRow }>
                <button className={ datasetType === 'images' ? classes.selected : '' } onClick={ () => updateType('images') }>Images</button>
                <button disabled={ true } className={ datasetType === 'text' ? classes.selected : '' } onClick={ () => updateType('text') }>Text</button>
                <button disabled={ true } className={ datasetType === 'other' ? classes.selected : '' } onClick={ () => updateType('other') }>Other</button>
            </div>

            <div className={ classes.datasetSecondRow }>
                <div>
                    <label htmlFor="name">Name of Dataset</label>
                    <input ref={ datasetName } id="name" type="text" />
                </div>
                
                <div>
                    <label htmlFor="pricingPlan">Pricing plan</label>

                    <select ref={ pricingPlan } id="pricingPlan">
                        <option value="free">Free forever</option>
                    </select>
                </div>
            </div>

            <div className={ classes.datasetThirdRow }>
                <div>
                    <p>Upload Images</p>

                    <label>
                        <input type="file" onChange={ uploadImages } multiple="multiple" />
                        Select Images
                    </label>
                </div>

                <p className={ classes.numImages }>{ images.length }/50 images uploaded</p>
            </div>

            <div className={ classes.datasetFourthRow }>
                {
                    images.map(
                        (image, index) => <UploadedImage key={ index } image={ image } index={ index } deleteImage={ deleteImage } />
                    )
                }
            </div>

            <div className={ classes.createDatasetButtonContainer }>
                <button onClick={ createDataset }>Create Dataset</button>
            </div>
        </div>
    );
}
