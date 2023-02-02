import React from 'react';
import Rectangle, {RectangleCoordinates} from './rectangle';
import {Stage, Layer} from 'react-konva';
import classes from "./annotationWrapper.module.css";
import {AnnotationPageContext} from "../../../../pages/annotate/annotate";
import {LABEL_COLORS} from "../../../../settings";
import Konva from 'konva';


export default function AnnotationWrapper() {
    const {curImage, curAnnotationData, updateAnnotationBox} = React.useContext(AnnotationPageContext);
    const [currentBox, selectCurrentBox] = React.useState(0);
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
            imageElem.addEventListener("load", updateWrapperSize);
            window.addEventListener("resize", updateWrapperSize);
            return () => {
                imageElem.removeEventListener("load", updateWrapperSize);
                window.removeEventListener("resize", updateWrapperSize);
            };
        }
    }, []);

    function checkDeselect(e: any) {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) selectCurrentBox(-1);
    }

    return (
        <div className={classes.annotationWrapper}>
            <img src={curImage!.url} alt={""} className={classes.annotationImage}
                 ref={annotationImageRef}></img>
            <Stage
                width={wrapperDimension.width}
                height={wrapperDimension.height}
                className={classes.annotationCanvasStage}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
            >
                {
                    curAnnotationData.map(function generateAnnotationRectangle(annotationBox, index) {
                        if (annotationBox) {
                            console.log("Render:", annotationBox);

                            const data = {
                                x: annotationBox.x,
                                y: annotationBox.y,
                                width: annotationBox.width,
                                height: annotationBox.height,
                                stroke: LABEL_COLORS[index],
                                strokeWidth: 4,
                            };

                            return (
                                <Layer key={index}>
                                    <Rectangle
                                        shapeProps={data}
                                        isSelected={currentBox === index}
                                        onSelect={
                                            () => selectCurrentBox(index)
                                        }
                                        onChange={
                                            (newAttrs: RectangleCoordinates) => {
                                                updateAnnotationBox(index, newAttrs);
                                            }
                                        }
                                        containerWidth={wrapperDimension.width}
                                        containerHeight={wrapperDimension.height}
                                    />
                                </Layer>
                            );
                        }
                    })
                }

            </Stage>
        </div>
    );
};
