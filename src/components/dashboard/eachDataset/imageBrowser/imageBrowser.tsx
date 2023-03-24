import ImageComponent from '../imageComponent/imageComponent';

import classes from '../common.module.css';
import imageGridClasses from '../images.module.css';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import api from '../../../../helpers/api';

type ImageType = 'completed' | 'feedback' | 'uploaded'

export default function ImageBrowser(props: { type: ImageType, dataset: Dataset, forceUpdate: () => void }) {
    const [{ images }, setImages] = React.useState<{ images: Map<string, ImageWithoutAnnotation> }>({ images: new Map() });
    const [lastId, setLastId] = React.useState<string | undefined>(undefined);
    const [isInitialized, setIsInitialized] = React.useState<boolean>(true);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    async function fetchImages() {
        const response = (await api.get(`/api/dataset/${props.dataset.id}/images`, {
            params: {
                lastId: lastId,
                type: props.type,
                count: 3,
            },
        })).data;

        const cursorId = response.cursor?._id;
        for (const fetchedImage of response.data) {
            images.set(fetchedImage._id, {
                _id: fetchedImage._id,
                displayName: fetchedImage.displayName,
                url: fetchedImage.url,
            });
        }
        setImages({ images: images });
        setIsInitialized(false);
        setLastId(cursorId);
    }

    const descriptionMapping: Record<ImageType, string> = {
        completed: 'Dataset images',
        feedback: 'Feedback images',
        uploaded: 'Uploaded images',
    };

    const imageComponents: React.ReactNode[] = [];
    images.forEach(function createImageComponent(image, id) {
        imageComponents.push(<ImageComponent key={ id } image={ image } forceUpdate={ props.forceUpdate }/>);
    });
    return (
        <div className={ classes.container } ref={ containerRef }>
            <InfiniteScroll hasMore={ isInitialized || !!lastId } loadMore={ fetchImages }
                            className={ classes.contentContainer } useWindow={ false }
                            getScrollParent={ () => containerRef.current }>
                <h1>{descriptionMapping[props.type]}</h1>

                <div className={ imageGridClasses.uploadedImagesContainer }>
                    {imageComponents}
                </div>
            </InfiniteScroll>
        </div>
    );
}
