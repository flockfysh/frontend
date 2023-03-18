import { FaTrash } from 'react-icons/fa';

import api from '../../../../helpers/api';

import imageClasses from './imageComponent.module.css';

export default function ImageComponent(props: { image: ImageWithoutAnnotation, forceUpdate: () => void }) {
  async function deleteImage() {
    const res = await api.delete(`/api/image/${ props.image._id }`);

    if(res.status === 200) props.forceUpdate();
  }

  return (
    <div className={ imageClasses.imageContainer }>
      <img src={ props.image.url } alt={ props.image.displayName } />

      <FaTrash className={ imageClasses.trashIcon } onClick={ deleteImage } />

      <p>{ props.image.displayName }</p>
    </div>
  );
}
