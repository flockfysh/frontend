import React, { useState, useEffect } from 'react';

import GradientLink from '../../../UI/gradientLink/gradientLink';
import Label from '../label/label';
import AnnotationWrapper from '../wrapper/annotationWrapper';
import Button from '../../../UI/button/button';
import Loading from '../../../loading/loading';
import { LABEL_COLORS } from '../../../../settings';
import { RxArrowLeft, RxArrowRight } from 'react-icons/rx';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../../helpers/api';
import classes from './annotate.module.css';
import AnnotationObject from '../wrapper/annotationObject';
import { v4 } from 'uuid';

export interface IAnnotationPageContext {
    curImage: UploadedImage | null,
    labels: string[],
    imageIndex: number,
    nextImage: () => void;
    prevImage: () => void;
    curAnnotationData: Map<string, AnnotationObject>;
    refresh: () => void;
    curLabel: number;
    setCurLabel: (label: number) => void;
    curBox: string;
    isEditing: boolean;
    setIsEditing: (data: boolean) => void;
    setCurBox: (data: string) => void;
    addAnnotationObject: (params?: AnnotationBox) => Promise<void>;
    numImages: number;
}

export const AnnotationPageContext = React.createContext<IAnnotationPageContext>({
    curImage: null,
    labels: [],
    imageIndex: 0,
    curAnnotationData: new Map(),
    numImages: 0,
    nextImage: () => {
    },
    prevImage: () => {
    },
    refresh: () => {
    },
    curLabel: -1,
    setCurLabel: () => {
    },
    curBox: '',
    setCurBox: () => {
    },
    addAnnotationObject: async () => {
    },
    isEditing: false,
    setIsEditing: () => {
    },
});

export default function Annotate() {
    const params = useParams();
    const navigate = useNavigate();

    const [labels, setLabels] = useState<string[]>([]);
    const [imageIds, setImageIds] = useState<string[]>([]);
    const [curImage, setCurImage] = useState<UploadedImage | null>(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [{ curAnnotationData }, setCurAnnotationData] = useState<{
        curAnnotationData: Map<string, AnnotationObject>,
    }>({
        curAnnotationData: new Map(),
    });
    const [curLabel, setCurLabel] = useState(-1);
    const [curBox, setCurBox] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [numImages, setNumImages] = useState(0);

    useEffect(() => {
        if (params.datasetId) {
            (async function getCurrentDataset() {
                try {
                    const datasetState = (await api.get(`/api/dataset/${params.datasetId}/state`)).data.data;
                    let images = [];
                    if (datasetState === 'feedback') {
                        images = (await api.get(`/api/dataset/${params.datasetId}/imageIds`, { params: { state: 'feedback' } })).data.data;
                    }
                    else if (datasetState === 'untrained') {
                        images = (await api.get(`/api/dataset/${params.datasetId}/imageIds`, { params: { state: 'uploaded' } })).data.data;
                    }
                    const datasetLabels = (await api.get(`/api/dataset/${params.datasetId}/labels`)).data.data;
                    setImageIndex(0);
                    setImageIds(images);
                    setNumImages(images.length);
                    setLabels(datasetLabels);
                }
                catch (e) {
                    navigate('/404');
                }
            })();
        }
        else {
            navigate('/404');
        }
    }, [params.datasetId]);
    useEffect(() => {
        if (imageIds.length) {
            (async function getCurrentImageInfo() {
                try {
                    // Step 1: Get the image.
                    const fetchedImage = (await api.get<{ success: boolean, data: UploadedImage }>(`/api/image/${imageIds[imageIndex]}`)).data.data;
                    setCurImage(fetchedImage);

                    // Step 2: Get the image's annotation data.
                    const remoteAnnotationData = (await api.get<{ success: boolean, data: RemoteAnnotationObject[] }>(`/api/image/${imageIds[imageIndex]}/annotations`)).data.data;

                    const localAnnotationData = new Map<string, AnnotationObject>();
                    for (const remoteObject of remoteAnnotationData) {
                        const [x, y, width, height] = remoteObject.boundingBox;
                        localAnnotationData.set(v4(), new AnnotationObject(remoteObject.class, remoteObject.id, {
                            x, y, width, height,
                        }));
                    }
                    setCurAnnotationData({ curAnnotationData: localAnnotationData });
                }
 catch (e) {
                }
            })();
        }
    }, [imageIds, imageIndex]);
    React.useEffect(() => {
        setCurBox('');
    }, [curLabel]);
    React.useEffect(() => {
        setCurBox('');
    }, [isEditing]);

    function nextImage() {
        if (imageIndex + 1 < imageIds.length) {
            setImageIndex(imageIndex + 1);
        }
    }

    function prevImage() {
        if (imageIndex - 1 >= 0) {
            setImageIndex(imageIndex - 1);
        }
    }

    function refresh() {
        setCurAnnotationData({ curAnnotationData });
    }

    async function addAnnotationObject(params?: AnnotationBox) {
        if (curLabel === -1) {
            throw new Error('No label selected.');
        }
        if (!curImage) {
            throw new Error('No image selected.');
        }
        let newId: string;
        do {
            newId = v4();
        } while (curAnnotationData.has(newId));
        const annotationObj = new AnnotationObject(curLabel, undefined, params);
        curAnnotationData.set(newId, annotationObj);
        refresh();
        await annotationObj.saveTo(curImage.id);
    }

    return (
        <AnnotationPageContext.Provider value={ {
            curImage, labels, nextImage, prevImage, imageIndex,
            curAnnotationData, refresh, curLabel, setCurLabel, curBox,
            setCurBox, addAnnotationObject, isEditing, setIsEditing, numImages
        } }>
            <AnnotateInner></AnnotateInner>
        </AnnotationPageContext.Provider>
    );
}

function AnnotateInner() {
    const {
        curImage,
        labels,
        nextImage,
        prevImage,
        imageIndex,
        curLabel,
        setCurLabel,
        isEditing,
        setIsEditing,
        setCurBox,
        numImages,
    } = React.useContext(AnnotationPageContext);
    const params = useParams();

    setCurBox;

    if (!curImage) {
        return <Loading/>;
    }

    return (
        <div className={ classes.annotateContainer }>
            <div className={ classes.headingContainer }>
                <h1 className={ classes.heading }>Image - {imageIndex + 1}/{numImages}</h1>
            </div>
            <div className={ classes.submitButtonContainer }>
                <GradientLink to={ `/dashboard/${params.datasetId}/train` } children="Initiate training"
                              gradientDirection="rightToLeft"
                              className={ classes.initiateTrainingButton }/>
            </div>
            <div className={ classes.leftContainer }>
                <AnnotationWrapper></AnnotationWrapper>
            </div>
            <div className={ classes.labelContainer }>
                <div className={ classes.labelList }>
                    {
                        labels.map(function generateLabelButton(labelName, index) {
                            return (
                                <Label
                                    key={ index }
                                    dotColor={ LABEL_COLORS[index] }
                                    selected={ index === curLabel }
                                    onClick={ () => {
                                        if (curLabel === index) {
                                            setCurLabel(-1);
                                        }
                                        else {
                                            setCurLabel(index);
                                        }
                                    } }
                                >{labelName}</Label>
                            );
                        })
                    }
                </div>
                <div className={ classes.utilityButtons }>
                    <Button className={ classes.addLabelButton }
                            onClick={ () => setIsEditing(!isEditing) }>{isEditing ? 'Currently Editing' : 'Edit Bounding Box'}</Button>
                </div>

            </div>
            <div className={ classes.switchImageContainer }>
                <button className={ classes.switchImageButton } onClick={ prevImage }>
                    <RxArrowLeft className={ classes.switchImageIcon }/>
                </button>

                <button className={ classes.switchImageButton } onClick={ nextImage }>
                    <RxArrowRight className={ classes.switchImageIcon }/>
                </button>
            </div>
        </div>
    );
}
