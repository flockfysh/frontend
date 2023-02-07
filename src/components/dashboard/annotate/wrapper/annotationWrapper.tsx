import React from 'react';
import Rectangle from './rectangle';
import {Stage, Layer} from 'react-konva';
import classes from './annotationWrapper.module.css';
import {AnnotationPageContext} from '../../../../pages/annotate/annotate';
import {LABEL_COLORS} from '../../../../settings';

export default function AnnotationWrapper() {
    const {curImage, curAnnotationData, updateAnnotationBox, selectedBox} = React.useContext(AnnotationPageContext);
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

    let rectangle;
    if (curAnnotationData[selectedBox]) {
        const shapeProps = {
            ...curAnnotationData[selectedBox]!,
            stroke: LABEL_COLORS[selectedBox],
        };
        rectangle = <Rectangle shapeProps={shapeProps}
                               isSelected={true}
                               onSelect={
                                   () => {}
                               }
                               onChange={
                                   (newAttrs: AnnotationBox) => {
                                       updateAnnotationBox(selectedBox, newAttrs);
                                   }
                               }
                               containerWidth={wrapperDimension.width}
                               containerHeight={wrapperDimension.height}
        />;
    }

    return (
        <div className={classes.annotationWrapper}>
            <img src={curImage!.url} alt={''} className={classes.annotationImage}
                 ref={annotationImageRef}></img>
            <Stage
                width={wrapperDimension.width}
                height={wrapperDimension.height}
                className={classes.annotationCanvasStage}>
                {
                    curAnnotationData[selectedBox] && rectangle
                }
            </Stage>
        </div>
    );
}
