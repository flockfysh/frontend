import {useState, useEffect} from 'react';

import GradientLink from '../../components/UI/gradientLink/gradientLink';
import Label from '../../components/dashboard/annotate/label/label';
import Wrapper from '../../components/dashboard/annotate/wrapper/wrapper';
import Loading from '../../components/loading/loading';

import classes from './annotate.module.css';
import {RxArrowLeft, RxArrowRight, RxPlus} from 'react-icons/rx';

export default function Annotate() {
	const [images, updateImages] = useState([] as DatasetImage[]);
    const [imageIndex, updateImageIndex] = useState(0);
    const [isLoading, updateLoading] = useState(true);

    useEffect(() => {
        updateImages(
            [
                {
                    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzsi4JX8QgMg_J0-xUHxeJ9Ot_2zVfoh2Gw&usqp=CAU',
                    name: 'dog'
                }
            ]
        );
    }, []);

    useEffect(() => {
        updateLoading(false);
    }, [images]);
    const rect = {
        x: 150,
        y: 150,
        width: 100,
        height: 100
    };

    if (isLoading) return <Loading/>;

    return (
        <div className={classes.annotateContainer}>
            <div className={classes.headingContainer}>
                <h1 className={classes.heading}>Picture - {imageIndex + 1}/50</h1>
            </div>
            <div className={classes.submitButtonContainer}>
                <GradientLink to="/" text="Initiate training" gradientDirection="rightToLeft"
                              className={classes.initiateTrainingButton}/>
            </div>
            <div className={classes.leftContainer}>
                <div
                    className={classes.wrapperDiv}
                    style={
                        {
                            backgroundImage: "url(" + images[imageIndex].url + ")"
                        }
                    }
                >
                </div>


            </div>

            <div className={classes.rightContainer}>
                <div className={classes.box}/>
            </div>
            <div className={classes.labelContainer}>
                <div className={classes.labelList}>
                    <Label text="Dog"/>
                    <Label text="Playing"/>
                    <Label text="Golden Spaniel"/>
                    <Label text="Golden Spaniel"/>
                </div>
                <button className={classes.addLabelButton}><RxPlus/></button>
            </div>
            <div className={classes.switchImageContainer}>
                <button className={classes.switchImageButton}>
                    <RxArrowLeft className={classes.switchImageIcon}/>
                </button>

                <button className={classes.switchImageButton}>
                    <RxArrowRight className={classes.switchImageIcon}/>
                </button>
            </div>
        </div>
    );
}
