import React from 'react';
import { FaTrash } from 'react-icons/fa';

import api from '../../../../helpers/api';

import LoadingIcon from '../../../UI/loadingIcon/loadingIcon';
import imageClasses from './imageComponent.module.css';

export default function ImageComponent(props: { image: ImageWithoutAnnotation }) {
    const [deleted, setDeleted] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    async function deleteImage() {
        const res = await api.delete(`/api/image/${props.image._id}`);
        if (res.status === 200) setDeleted(true);
    }

    return (
        deleted ? <></> : (
            <div className={ imageClasses.imageContainer }>
                <div className={ imageClasses.imageFrame }>
                    <img className={ imageClasses.image } src={ props.image.url } alt={ props.image.displayName }
                         onLoad={ () => {
                             if (!loaded) setLoaded(true);
                         } }/>
                    <div className={ `${imageClasses.loadingFrame} ${loaded ? imageClasses.loadingHidden : ''}` }>
                        <LoadingIcon className={ imageClasses.loadingIcon }></LoadingIcon>
                    </div>
                </div>

                <FaTrash className={ imageClasses.trashIcon } onClick={ deleteImage }/>

                <p>{props.image.displayName}</p>
            </div>
        )
    );
}
