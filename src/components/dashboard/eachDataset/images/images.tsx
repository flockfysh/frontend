import DatasetImage from '../datasetImage/datasetImage';

import classes from './images.module.css';

export default function Images(props: { dataset: Dataset }) {
  const testImages = [];

  for(let i = 0; i < 20; i++) {
    testImages.push(props.dataset.uploadedImages[0]);
  }

  return (
    <div className={ classes.uploadedImages }>
      <div className={ classes.uploadedImagesContentContainer }>
        <h1>Dataset</h1>

        <div className={ classes.uploadedImagesContainer }>
          {
            testImages.map(
              (image, index) => (
                <DatasetImage key={ index } image={ image } />
              )
            )
          }
        </div>
      </div>

      <div className={ classes.loadBtnContainer }>
        <button>Load more images</button>
      </div>
    </div>
  );
}
