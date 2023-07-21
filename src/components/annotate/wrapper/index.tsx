import { useContext, useState, useRef, useEffect } from 'react';
import { Stage } from 'react-konva';

import Rectangle from '../rectangle';
import AddAnnotationBoxLayer from './addAnnotationBoxLayer';

import { AnnotationPageContext } from '@/contexts/annotationContext';

import { LABEL_COLORS } from '@/settings';

import classes from './styles.module.css';

/**
 * The annotation canvas allows users to draw and edit bounding boxes to annotate images.
 * Converts the curAnnotationData map object to rectangular layers on the canvas.
 *
 * If a bounding boxes' label match the current label the user's selecting,
 * it will be shown on the canvas. Others are hidden.
 *
 * If the annotation page is in editing mode, matching bounding boxes are displayed at full opacity and the user
 * can select one of them.
 * If the annotation page is in drawing mode, these bounding boxes have lower opacity,
 * and the user can only draw new boxes on the screen by using drag and drop.
 *
 * @constructor
 */
export default function AnnotationWrapper() {
    const {
        curImage,
        isEditing,
        addAnnotationObject,
        curAnnotationData,
        curLabel,
        curBox,
        setCurBox,
        refresh,
    } = useContext(AnnotationPageContext);

    const [wrapperDimension, setWrapperDimension] = useState<{
        width: number;
        height: number;
    }>({
        width: 0,
        height: 0,
    });

    const annotationImageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (annotationImageRef.current) {
            const imageElem = annotationImageRef.current;

            const updateWrapperSize = function (): void {
                setWrapperDimension({
                    width: Math.ceil(imageElem.width),
                    height: Math.ceil(imageElem.height),
                });
            };

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
        if (annotationObject.label === curLabel)
            rectangles.push(
                <Rectangle
                    key={ id }
                    shapeProps={ {
                        ...annotationObject.boundingBox,
                        stroke: curLabel ? curLabel.color : LABEL_COLORS[0],
                        opacity: isEditing ? 1 : 0.5,
                    } }
                    onSelect={ () => {
                        setCurBox(id);
                    } }
                    onDeselect={ () => {
                        setCurBox('');
                    } }
                    isSelected={ id === curBox }
                    containerWidth={ wrapperDimension.width }
                    containerHeight={ wrapperDimension.height }
                    onChange={ function save(box) {
                        annotationObject.edit(box);
                        refresh();
                    } }
                    onDelete={ function deleteBox() {
                        annotationObject.delete();
                        curAnnotationData.delete(id);

                        refresh();
                        setCurBox('');
                    } }
                />
            );
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
                className={ `${classes.annotationCanvasStage} ${
                    !isEditing ? classes.canvasCrosshair : ''
                }` }
            >
                { rectangles }

                { !isEditing && (
                    <AddAnnotationBoxLayer
                        width={ wrapperDimension.width }
                        height={ wrapperDimension.height }
                        onAdd={ (coords) => {
                            addAnnotationObject(coords);
                        } }
                    />
                ) }
            </Stage>
        </div>
    );
}
