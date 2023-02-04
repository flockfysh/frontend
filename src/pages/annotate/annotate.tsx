import React from 'react';
import {useState, useEffect} from 'react';

import GradientLink from '../../components/UI/gradientLink/gradientLink';
import Label from '../../components/dashboard/annotate/label/label';
import AnnotationWrapper from '../../components/dashboard/annotate/wrapper/annotationWrapper';
import Loading from '../../components/loading/loading';
import {LABEL_COLORS} from "../../settings";
import {RxArrowLeft, RxArrowRight, RxPlus} from 'react-icons/rx';
import {useNavigate, useParams} from 'react-router-dom';
import api from "../../helpers/api";
import classes from './annotate.module.css';
import ReloadBlocker from '../../components/UI/reloadBlocker/reloadBlocker';

export interface IAnnotationPageContext {
    curImage: UploadedImage | null,
    labels: string[],
    imageIndex: number,
    nextImage: () => void;
    prevImage: () => void;
    curAnnotationData: (AnnotationBox | undefined)[],
    removeAnnotationBox: (id: number) => void;
    updateAnnotationBox: (id: number, data: AnnotationBox) => void;
    selectedBox: number,
    setSelectedBox: (boxId: number) => void;
}

export const AnnotationPageContext = React.createContext<IAnnotationPageContext>({
    curImage: null,
    labels: [],
    imageIndex: 0,
    curAnnotationData: [],
    removeAnnotationBox: () => {
    },
    updateAnnotationBox: () => {
    },
    nextImage: () => {
    },
    prevImage: () => {
    },
    selectedBox: -1,
    setSelectedBox: () => {},
});

export default function Annotate() {
    const params = useParams();
    const navigate = useNavigate();

    const [labels, setLabels] = useState<string[]>([]);
    const [imageIds, setImageIds] = useState<string[]>([]);
    const [curImage, setCurImage] = useState<UploadedImage | null>(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [{curAnnotationData}, setCurAnnotationData] = useState<{
        curAnnotationData: (AnnotationBox | undefined)[],
    }>({
        curAnnotationData: [],
    });
    const [reloadBlocked, setReloadBlocked] = useState(false);
    const [selectedBox, setSelectedBox] = useState(-1);

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
                    const fetchedImage = (await api.get<{ success: boolean, data: UploadedImage }>(`/api/image/${imageIds[imageIndex]}`)).data.data;
                    setCurImage(fetchedImage);
                    const remoteAnnotationData = fetchedImage.annotationData;
                    const localAnnotationData: AnnotationBox[] = [];
                    for (let remoteObject of remoteAnnotationData) {
                        const [x, y, width, height] = remoteObject.boundingBox;
                        localAnnotationData[remoteObject.class] = {
                            x, y, width, height
                        };
                    }
                    setCurAnnotationData({curAnnotationData: localAnnotationData});
                    setSelectedBox(Math.max(...remoteAnnotationData.map(remoteObj => remoteObj.class)));
                } catch (e) {
                    console.error(e);
                }
            }();
        }
    }, [imageIds, imageIndex]);

    function nextImage() {
        if (imageIndex + 1 < imageIds.length) {
            setImageIndex(imageIndex + 1);
            saveAnnotation();
        }
    }

    function prevImage() {
        if (imageIndex - 1 >= 0) {
            setImageIndex(imageIndex - 1);
            saveAnnotation();
        }
    }

    async function saveAnnotation() {
        if (curImage) {
            const remoteAnnotationData: RemoteAnnotationObject[] = [];
            let i = 0;
            for (let box of curAnnotationData) {
                if (box) {
                    const {x, y, width, height} = box;
                    remoteAnnotationData.push({
                        class: i,
                        boundingBox: [x, y, width, height]
                    });
                }
                i++;
            }
            await api.post(`/api/image/${curImage.id}/set-annotation`, remoteAnnotationData);
        }
        setReloadBlocked(false);
    }

    function removeAnnotationBox(boxId: number) {
        curAnnotationData[boxId] = undefined;
        setCurAnnotationData({curAnnotationData});
        setReloadBlocked(true);
        saveAnnotation();
    }

    function updateAnnotationBox(boxId: number, data: AnnotationBox) {
        curAnnotationData[boxId] = data;
        setCurAnnotationData({curAnnotationData});
        setReloadBlocked(true);
        saveAnnotation();
    }

    let reloadBlocker;
    if (reloadBlocked) {
        reloadBlocker = <ReloadBlocker
            message={"Are you sure you want to quit? Your annotations haven't been saved."}></ReloadBlocker>;
    }

    return <AnnotationPageContext.Provider value={{
        curImage,
        labels,
        nextImage,
        prevImage,
        imageIndex,
        curAnnotationData,
        removeAnnotationBox,
        updateAnnotationBox,
        selectedBox,
        setSelectedBox,
    }}>
        {reloadBlocker}
        <AnnotateInner></AnnotateInner>
    </AnnotationPageContext.Provider>;
}

function AnnotateInner() {
    const {
        curImage,
        labels,
        nextImage,
        prevImage,
        imageIndex,
        curAnnotationData,
        removeAnnotationBox,
        updateAnnotationBox,
        selectedBox,
        setSelectedBox,
    } = React.useContext(AnnotationPageContext);
    const params = useParams();

    if (!curImage) {
        return <Loading/>;
    }

    return (
        <div className={classes.annotateContainer}>
            <div className={classes.headingContainer}>
                <h1 className={classes.heading}>Picture - {imageIndex + 1}/50</h1>
            </div>
            <div className={classes.submitButtonContainer}>
                <GradientLink to={`/dashboard/${params.datasetId}/train`} children="Initiate training" gradientDirection="rightToLeft"
                              className={classes.initiateTrainingButton}/>
            </div>
            <div className={classes.leftContainer}>
                <AnnotationWrapper></AnnotationWrapper>
            </div>

            <div className={classes.rightContainer}>
                <div className={classes.box}/>
            </div>
            <div className={classes.labelContainer}>
                <div className={classes.labelList}>
                    {
                        labels.map(function generateLabelButton(labelName, index) {
                            let used = !!curAnnotationData[index];

                            return <Label
                                key={index}
                                dotColor={LABEL_COLORS[index]}
                                used={used}
                                selected={index === selectedBox}
                                onClick={() => {
                                    if (!used) {
                                        updateAnnotationBox(index, {
                                            x: 0.5,
                                            y: 0.5,
                                            height: 0.5,
                                            width: 0.5,
                                        });
                                    }
                                    if (selectedBox === index) {
                                        setSelectedBox(-1);
                                    } else {
                                        setSelectedBox(index);
                                    }
                                }}
                                onRemove={used ? function removeLabel(){
                                    removeAnnotationBox(index);
                                    setSelectedBox(-1);
                                } : undefined}
                            >{labelName}</Label>;
                        })
                    }
                </div>
            </div>
            <div className={classes.switchImageContainer}>
                <button className={classes.switchImageButton} onClick={prevImage}>
                    <RxArrowLeft className={classes.switchImageIcon}/>
                </button>

                <button className={classes.switchImageButton} onClick={nextImage}>
                    <RxArrowRight className={classes.switchImageIcon}/>
                </button>
            </div>
        </div>
    );
}
