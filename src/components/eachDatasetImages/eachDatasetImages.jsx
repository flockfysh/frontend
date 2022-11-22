import classes from "./eachDatasetImages.module.css";
import imageClasses from "../../pages/EachDataSet/eachDatasetImages.module.css";

export default function EachDatasetImages(props) {
    let testImages = [];

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
                                <div className={ imageClasses.imageContainer } key={ index }>
                                    <img src={ image.url } alt={ image.name } />
                                    
                                    <p className={ imageClasses.trashIcon }>Trash</p>
                            
                                    <p>{ image.name }</p>
                                </div>
                            )
                        )
                    }
                </div>

                <button>Load more images</button>
            </div>
        </div>
    );
}
