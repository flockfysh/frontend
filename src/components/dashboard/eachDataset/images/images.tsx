import DatasetImage from '../datasetImage/datasetImage';

import classes from '../common.module.css';
import imageGridClasses from '../images.module.css';

export default function Images(props: { dataset: Dataset }) {
    const testImages = [];

    for (let i = 0; i < 20; i++) {
        testImages.push(props.dataset.uploadedImages[0]);
    }

    return (
        <div className={classes.container}>
            <div className={classes.contentContainer}>
                <h1>Dataset</h1>

                <div className={imageGridClasses.uploadedImagesContainer}>
                    {
                        testImages.map(
                            (image, index) => (
                                <DatasetImage key={index} image={image}/>
                            )
                        )
                    }
                </div>
                <div className={imageGridClasses.loadBtnContainer}>
                    <button className={imageGridClasses.loadBtn}>Load more images</button>
                </div>
            </div>
        </div>
    );
}
