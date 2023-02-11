import { useContext, useState, useRef, useEffect } from 'react';
import { Stage } from 'react-konva';

import Rectangle from './rectangle';
import AddAnnotationBoxLayer from './addAnnotationBoxLayer';

import { AnnotationPageContext } from '../../../../pages/annotate/annotate';

import { LABEL_COLORS } from '../../../../settings';

import classes from './annotationWrapper.module.css';

export default function AnnotationWrapper() {
    const {
        curImage,
        isEditing,
        addAnnotationObject,
        curAnnotationData,
        curLabel,
        curBox,
        setCurBox,
        refresh
    } = useContext(AnnotationPageContext);

    const [wrapperDimension, setWrapperDimension] = useState<{ width: number, height: number }>({
        width: 0,
        height: 0,
    });

    const annotationImageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
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

    const rectangles = [];

    for (const [id, annotationObject] of curAnnotationData.entries()) {
        if (annotationObject.class === curLabel) {
            rectangles.push((
                <Rectangle 
                    key={ id }
                    shapeProps={ {
                        ...annotationObject.boundingBox,
                        stroke: LABEL_COLORS[curLabel],
                        opacity: isEditing ? 1 : 0.2,
                    } }
                    onSelect={ () => {
                        setCurBox(id);
                    } }
                    isSelected={ id === curBox }
                    containerWidth={ wrapperDimension.width }
                    containerHeight={ wrapperDimension.height }
                    onChange={
                        function save(box) {
                            annotationObject.edit(box);
                            refresh();
                        }
                    }
                    onDelete={
                        function deleteBox() {
                            annotationObject.delete();
                            curAnnotationData.delete(id);
                            refresh();
                            setCurBox('');
                        }
                    }
                />
            ));
        }
    }

    return (
        <div className={ classes.annotationWrapper }>
            <img 
                alt="" 
                className={ classes.annotationImage }
                src={ curImage?.url } 
                ref={ annotationImageRef } 
            />

            <Stage
                width={ wrapperDimension.width }
                height={ wrapperDimension.height }
                onContextMenu={ (e) => {
                    e.evt.preventDefault();
                    setCurBox('');
                } }
                className={ `${ classes.annotationCanvasStage } ${ !isEditing ? classes.canvasCrosshair : '' }` }>
                { rectangles }
                {
                    !isEditing && (
                        <AddAnnotationBoxLayer 
                            width={ wrapperDimension.width }                 
                            height={ wrapperDimension.height }
                            onAdd={ (coords) => {
                                addAnnotationObject(coords);
                            } } 
                        />
                    )
                }
            </Stage>
        </div>
    );
}
