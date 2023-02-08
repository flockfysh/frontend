import React from 'react';
import Rectangle from './rectangle';
import {Stage} from 'react-konva';
import classes from './annotationWrapper.module.css';
import {AnnotationPageContext} from '../../../../pages/annotate/annotate';
import {LABEL_COLORS} from '../../../../settings';

export default function AnnotationWrapper() {
    const {curImage, curAnnotationData, curLabel, curBox, setCurBox} = React.useContext(AnnotationPageContext);
    const [wrapperDimension, setWrapperDimension] = React.useState<{ width: number, height: number }>({
        width: 0,
        height: 0,
    });
    const annotationImageRef = React.useRef<HTMLImageElement | null>(null);

    React.useEffect(() => {
        if (annotationImageRef.current) {
            const imageElem = annotationImageRef.current;

            function updateWrapperSize() {
                setWrapperDimension({
                    width: Math.ceil(imageElem.width),
                    height: Math.ceil(imageElem.height)
                });
            }

            updateWrapperSize();
            imageElem.addEventListener('load', updateWrapperSize);
            window.addEventListener('resize', updateWrapperSize);
            return () => {
                imageElem.removeEventListener('load', updateWrapperSize);
                window.removeEventListener('resize', updateWrapperSize);
            };
        }
    }, []);

    let rectangles = [];

    for (let [id, annotationObject] of curAnnotationData.entries()) {
        if (annotationObject.class === curLabel) {
            rectangles.push((
                <Rectangle
                    shapeProps={{
                        ...annotationObject.boundingBox,
                        stroke: LABEL_COLORS[curLabel]
                    }}
                    onSelect={() => {
                        setCurBox(id);
                    }}
                    isSelected={id === curBox}
                    containerWidth={wrapperDimension.width}
                    containerHeight={wrapperDimension.height}
                    onChange={function save(box) {
                        annotationObject.edit(box);
                    }}
                />
            ));
        }
    }

    return (
        <div className={classes.annotationWrapper}>
            <img src={curImage!.url} alt={''} className={classes.annotationImage}
                 ref={annotationImageRef}></img>
            <Stage
                width={wrapperDimension.width}
                height={wrapperDimension.height}
                className={classes.annotationCanvasStage}>
                {rectangles}
            </Stage>
        </div>
    );
}
