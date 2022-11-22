import classes from "./eachDatasetUploadedImages.module.css";
import imageClasses from "../../../../pages/EachDataSet/eachDatasetImages.module.css";

export default function EachDatasetUploadedImages(props) {
   let testImages = [];

   for (let i = 0; i < 20; i++) {
      testImages.push(props.dataset.uploadedImages[0]);
   }

   return (
      <div className={ classes.uploadedImages }>
         <div className={ classes.uploadedImagesContentContainer }>
            <h1>Uploaded images</h1>

            <div className={ classes.uploadedImagesContainer }>
               {
                  testImages.map(
                     (image, index) => (
                        <div className={ imageClasses.imageContainer } key={ index }>
                           <img src={ image.url } alt={ image.name } />

                           <p className={ imageClasses.trashIcon }>Trash</p>

                           <p>{ image.name }</p>
                        </div>
                     )
                  )
               }
            </div>
         </div>
      </div>
   );
}

