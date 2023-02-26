import ImageComponent from '../imageComponent/imageComponent';

import classes from '../common.module.css';
import imageGridClasses from '../images.module.css';

export default function FeedbackImages(props: { dataset: Dataset, forceUpdate: () => void }) {
    return (
        <div className={ classes.container }>
            <div className={ classes.contentContainer }>
                <h1>Feedback images</h1>

                <div className={ imageGridClasses.uploadedImagesContainer }>
                    {
                        props.dataset.feedbackImages.map(
                            (image, index) => (
                                <ImageComponent key={ index } image={ image } dataset={ props.dataset } forceUpdate={ props.forceUpdate } />
                            ),
                        )
                    }
                </div>
                
                <div className={ imageGridClasses.loadBtnContainer }>
                    <button className={ imageGridClasses.loadBtn }>Load more images</button>
                </div>
            </div>
        </div>
    );
}
