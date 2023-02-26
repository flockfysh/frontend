import ImageComponent from '../imageComponent/imageComponent';

import classes from '../common.module.css';
import imageGridClasses from '../images.module.css';

export default function UploadedImages(props: { dataset: Dataset, forceUpdate: () => void }) {
    return (
        <div className={ classes.container }>
            <div className={ classes.contentContainer }>
                <h1>Uploaded images</h1>

                <div className={ imageGridClasses.uploadedImagesContainer }>
                    {
                        props.dataset.uploadedImages.map(
                            (image, index) => (
                                <ImageComponent key={ index } image={ image } dataset={ props.dataset } forceUpdate={ props.forceUpdate } />
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
}
