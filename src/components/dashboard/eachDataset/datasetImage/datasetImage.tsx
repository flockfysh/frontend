import { FaTrash } from 'react-icons/fa';

import imageClasses from './datasetImage.module.css';

export default function DatasetImage(props: { image: DatasetImage }) {
  return (
    <div className={ imageClasses.imageContainer }>
      <img src={ props.image.url } alt={ props.image.name } />

      <FaTrash className={ imageClasses.trashIcon } />

      <p>{ props.image.name }</p>
    </div>
  );
}
