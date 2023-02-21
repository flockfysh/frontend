import { FaTrash } from 'react-icons/fa';

import imageClasses from './imageComponent.module.css';

export default function ImageComponent(props: { image: ImageWithoutAnnotation }) {
  return (
    <div className={ imageClasses.imageContainer }>
      <img src={ props.image.url } alt={ props.image.displayName } />

      <FaTrash className={ imageClasses.trashIcon } />

      <p>{ props.image.displayName }</p>
    </div>
  );
}
