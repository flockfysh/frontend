import DatasetImage from '../datasetImage/datasetImage';

import classes from './eachDatasetImages.module.css';

export default function EachDatasetImages(props) {
   let testImages = [];

   for (let i = 0; i < 20; i++) {
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

            <button>Load more images</button>
         </div>
      </div>
   );
}
