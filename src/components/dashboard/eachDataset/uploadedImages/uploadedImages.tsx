import DatasetImage from '../datasetImage/datasetImage';

import classes from '../common.module.css';
import imageGridClasses from '../images.module.css';

export default function UploadedImages(props: { dataset: Dataset }) {
    return (
        <div className={ classes.container }>
            <div className={ classes.contentContainer }>
                <h1>Uploaded images</h1>

                <div className={ imageGridClasses.uploadedImagesContainer }>
                    {
                        props.dataset.uploadedImages.map(
                            (image, index) => (
                                <DatasetImage key={ index } image={ image }/>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
}
