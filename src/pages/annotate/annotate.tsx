import {useState, useEffect} from 'react';

import GradientLink from '../../components/UI/gradientLink/gradientLink';
import Label from '../../components/dashboard/annotate/label/label';
import Wrapper from '../../components/dashboard/annotate/wrapper/wrapper';
import Loading from '../../components/loading/loading';

import classes from './annotate.module.css';
import {RxArrowLeft, RxArrowRight, RxPlus} from 'react-icons/rx';
import {useNavigate, useParams} from 'react-router-dom';
import api from "../../helpers/api";

export default function Annotate() {
    const params = useParams();
    const navigate = useNavigate();
    const [labels, setLabels] = useState<string[]>([]);
    const [imageIds, setImageIds] = useState<string[]>([]);
    const [curImage, setCurImage] = useState<UploadedImage | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        if (params.datasetId) {
            void async function getCurrentDataset() {
                try {
                    const uploadedImages = (await api.get(`/api/dataset/${params.datasetId}/uploadedImageIds`)).data.data;
                    const datasetLabels = (await api.get(`/api/dataset/${params.datasetId}/labels`)).data.data;
                    setImageIndex(0);
                    setImageIds(uploadedImages);
                    setLabels(datasetLabels);
                } catch (e) {
                    console.error(e);
                    navigate("/404");
                }
            }();
        } else {
            navigate("/404");
        }
    }, [params.datasetId]);

    useEffect(() => {
        if (imageIds.length) {
            void async function getCurrentImageInfo() {
                try {
                    const fetchedImage = (await api.get<{ success: boolean, data: UploadedImage }>(`/api/image/${imageIds[imageIndex]}`)).data;
                    setCurImage(fetchedImage.data);
                } catch (e) {
                    console.error(e);
                }
            }();
        }
    }, [imageIds, imageIndex]);


    if (!curImage) {
        return <Loading/>;
    }


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
                            // backgroundImage: "url(" + images[imageIndex].url + ")"
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
                    {
                        labels.map(function generateLabelButton(labelName) {
                            return <Label text={labelName}></Label>;
                        })
                    }
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
