import { useState } from 'react';

import Modal from '../modal/modal';

import classes from './uploadedImage.module.css';

export default function UploadedImage(props) {
    const [modalProps, updateModalProps] = useState(
        {
            display: false,
            displayImage: true
        }
    );

    function displayImage() {
        updateModalProps(
            {
                ...modalProps,
                display: true,
                image: props.image
            }
        );
    }

    function closeModal() {
        updateModalProps(
            {
                ...modalProps,
                display: false
            }
        );
    }

    return (
        <div className={ classes.uploadedImageContainer }>
            {
                modalProps.display ? <Modal {...modalProps} closeModal={ closeModal } /> : <></>
            }

            <h3>{ props.image.name }</h3>

            <button className={ classes.viewImage } onClick={ displayImage }>View Image</button>

            <button onClick={ () => props.deleteImage(props.index) } className={ classes.deleteUpload }>X</button>
        </div>
    );
}