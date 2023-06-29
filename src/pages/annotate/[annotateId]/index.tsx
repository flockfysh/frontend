import { useState, useEffect, useContext } from 'react';
import { RxArrowLeft, RxArrowRight } from 'react-icons/rx';

import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '@/pages/_app';

import GradientLink from '@/components/ui/gradientLink';
import Label from '@/components/annotate/label';
import Button from '@/components/ui/theming/button';
import Loading from '@/components/ui/loading';
import AnnotationObject from '@/components/annotate/wrapper/annotationObject';
import MainLayout from '@/components/layout/mainLayout';

import { AnnotationPageContext } from '@/contexts/annotationContext';

import api from '@/helpers/api';

import classes from './styles.module.css';

const Annotate: NextPageWithLayout = function () {
    const router = useRouter();
    const [labels, setLabels] = useState<Flockfysh.Label[]>([]);
    const [imageIds, setImageIds] = useState<string[]>([]);
    const [curImage, setCurImage] = useState<Flockfysh.Asset | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

    const [{ curAnnotationData }, setCurAnnotationData] = useState<{
        curAnnotationData: Map<string, AnnotationObject>;
    }>({
        curAnnotationData: new Map(),
    });

    const [curLabel, setCurLabel] = useState<Flockfysh.Label | null>(null);
    const [curBox, setCurBox] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [numImages, setNumImages] = useState(0);

    useEffect(() => {
        if (router.query.annotateId) {
            (async function getCurrentDataset() {
                try {
                    const datasetState = (
                        await api.get(
                            `/api/datasets/${router.query.annotateId}/stage`,
                        )
                    ).data.data;

                    let images = [];

                    if (datasetState === 'feedback') {
                        images = (
                            await api.get(
                                `/api/datasets/${router.query.annotateId}/assets/ids`,
                                { params: { stage: 'feedback' } },
                            )
                        ).data.data;
                    }
                    else if (datasetState === 'untrained') {
                        images = (
                            await api.get(
                                `/api/datasets/${router.query.annotateId}/assets/ids`,
                                { params: { stage: 'uploaded' } },
                            )
                        ).data.data;
                    }

                    const datasetLabels: Flockfysh.Label[] = (
                        await api.get(
                            `/api/datasets/${router.query.annotateId}/labels`,
                        )
                    ).data.data;

                    setImageIndex(0);
                    setImageIds(images);
                    setNumImages(images.length);
                    setLabels(datasetLabels);
                }
 catch (e) {
                    router.push('/404');
                }
            })();
        }
        else router.push('/404');
    }, [router.query.annotateId, router]);

    useEffect(() => {
        if (imageIds.length) {
            (async function getCurrentImageInfo() {
                try {
                    // Step 1: Get the image.
                    const fetchedImage = (
                        await api.get<{
                            success: boolean;
                            data: Flockfysh.Asset;
                        }>(`/api/assets/${imageIds[imageIndex]}`)
                    ).data.data;

                    setCurImage(fetchedImage);

                    // Step 2: Get the image's annotation data.
                    const remoteAnnotationData = (
                        await api.get<{ success: boolean; data: any[] }>(
                            `/api/assets/${imageIds[imageIndex]}/annotations`,
                        )
                    ).data.data;

                    const localAnnotationData = new Map<
                        string,
                        AnnotationObject
                    >();

                    for (const remoteObject of remoteAnnotationData) {
                        const [x, y, width, height] = remoteObject.boundingBox;
                        localAnnotationData.set(
                            v4(),
                            new AnnotationObject(
                                remoteObject.label,
                                remoteObject.frame,
                                remoteObject._id,
                                {
                                    x,
                                    y,
                                    width,
                                    height,
                                },
                            ),
                        );
                    }

                    setCurAnnotationData({
                        curAnnotationData: localAnnotationData,
                    });
                }
 catch (e) {
                }
            })();
        }
    }, [imageIds, imageIndex]);

    useEffect(() => {
        setCurBox('');
    }, [curLabel]);

    useEffect(() => {
        setCurBox('');
    }, [isEditing]);

    function nextImage() {
        if (imageIndex + 1 < imageIds.length) setImageIndex(imageIndex + 1);
    }

    function prevImage() {
        if (imageIndex - 1 >= 0) setImageIndex(imageIndex - 1);
    }

    function refresh() {
        setCurAnnotationData({ curAnnotationData });
    }

    async function addAnnotationObject(params?: AnnotationBox) {
        if (curLabel === null) throw new Error('No label selected.');

        if (!curImage) throw new Error('No image selected.');

        let newId: string;
        do {
            newId = v4();
        } while (curAnnotationData.has(newId));

        const annotationObj = new AnnotationObject(
            curLabel,
            0,
            undefined,
            params,
        );

        curAnnotationData.set(newId, annotationObj);
        refresh();

        await annotationObj.saveTo(curImage._id);
    }

    return (
        <AnnotationPageContext.Provider
            value={ {
                curImage,
                labels,
                nextImage,
                prevImage,
                imageIndex,
                curAnnotationData,
                refresh,
                curLabel,
                setCurLabel,
                curBox,
                setCurBox,
                addAnnotationObject,
                isEditing,
                setIsEditing,
                numImages,
            } }
        >
            <AnnotateInner/>
        </AnnotationPageContext.Provider>
    );
};

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
    } = useContext(AnnotationPageContext);

    const router = useRouter();
    setCurBox;

    const NoSSRComponent = dynamic(
        () => import('@/components/annotate/wrapper'),
        {
            ssr: false,
        },
    );

    if (!curImage) return <Loading/>;

    return (
        <div className={ classes.annotateContainer }>
            <div className={ classes.headingContainer }>
                <h1 className={ classes.heading }>
                    Image - { imageIndex + 1 }/{ numImages }
                </h1>
            </div>

            <div className={ classes.submitButtonContainer }>
                <GradientLink
                    to={ `./training/${router.query.annotateId}` }
                    gradientDirection="rightToLeft"
                    className={ classes.initiateTrainingButton }
                >
                    Initiate training
                </GradientLink>
            </div>

            <div className={ classes.leftContainer }>
                <NoSSRComponent/>
            </div>

            <div className={ classes.labelContainer }>
                <div className={ classes.labelList }>
                    { labels.map((label: Flockfysh.Label, index: number) => {
                        return (
                            <Label
                                key={ index }
                                dotColor={ label.color }
                                selected={ label === curLabel }
                                onClick={ () => {
                                    if (curLabel === label) setCurLabel(null);
                                    else setCurLabel(label);
                                } }
                            >
                                { label.name }
                            </Label>
                        );
                    }) }
                </div>

                <div className={ classes.utilityButtons }>
                    <Button
                        className={ classes.addLabelButton }
                        onClick={ () => setIsEditing(!isEditing) }
                    >
                        { isEditing ? 'Currently Editing' : 'Edit Bounding Box' }
                    </Button>
                </div>
            </div>

            <div className={ classes.switchImageContainer }>
                <button
                    className={ classes.switchImageButton }
                    onClick={ prevImage }
                >
                    <RxArrowLeft className={ classes.switchImageIcon }/>
                </button>

                <button
                    className={ classes.switchImageButton }
                    onClick={ nextImage }
                >
                    <RxArrowRight className={ classes.switchImageIcon }/>
                </button>
            </div>
        </div>
    );
}

Annotate.getLayout = function (page) {
    return <MainLayout>{ page }</MainLayout>;
};

export default Annotate;
