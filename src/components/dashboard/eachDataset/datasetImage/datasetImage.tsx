import { FaTrash } from 'react-icons/fa';

import imageClasses from './datasetImage.module.css';

export default function DatasetImage(props: { image: Image }) {
  return (
    <div className={ imageClasses.imageContainer }>
      <img src={ props.image.url } alt={ props.image.displayName } />

      <FaTrash className={ imageClasses.trashIcon } />

      <p>{ props.image.displayName }</p>
    </div>
  );
}
