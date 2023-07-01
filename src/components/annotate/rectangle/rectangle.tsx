import { useRef, useEffect, useState } from 'react';
import { RxCross1, RxEyeNone } from 'react-icons/rx';

import Konva from 'konva';
import { Layer, Rect, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';

import Button from '@/components/ui/theming/button';

import classes from './styles.module.css';

export interface RectangleProps {
    shapeProps: Konva.NodeConfig & AnnotationBox;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: () => void;
    onDeselect: () => void;
    onChange: (shape: AnnotationBox) => void;
    containerWidth: number;
    containerHeight: number;
}

function Buttons(props: { onDelete?: () => void; onDeselect?: () => void }) {
    return (
        <nav className={classes.rectangleUtilityButtons}>
            <Button className={`${classes.button}`} onClick={props.onDeselect}>
                <RxEyeNone />
            </Button>

            <Button
                className={`${classes.button} ${classes.deleteButton}`}
                onClick={props.onDelete}
            >
                <RxCross1 />
            </Button>
        </nav>
    );
}

export default function Rectangle(props: RectangleProps) {
    const shapeRef = useRef({} as Konva.Rect);
    const trRef = useRef({} as Konva.Transformer);

    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (props.isSelected) {
            const handler = function (e: KeyboardEvent): void {
                if (e.key === 'Delete') props.onDelete?.();
            };

            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer()!.batchDraw();

            window.addEventListener('keyup', handler);

            return () => window.removeEventListener('keyup', handler);
        }
    }, [props.isSelected, props]);

    const konvaRectWidth = props.shapeProps.width * props.containerWidth;
    const konvaRectHeight = props.shapeProps.height * props.containerHeight;

    const konvaRectX =
        (props.shapeProps.x - props.shapeProps.width / 2) *
        props.containerWidth;
        
    const konvaRectCenterX = props.shapeProps.x * props.containerWidth;
    const konvaRectY =
        (props.shapeProps.y - props.shapeProps.height / 2) *
        props.containerHeight;

    let transformer, htmlUtilityButtons;

    if (props.isSelected) {
        transformer = (
            <Transformer
                ignoreStroke={true}
                ref={trRef}
                rotateEnabled={false}
                boundBoxFunc={(oldBox, newBox) => {
                    const tolerance = 0;

                    if (
                        newBox.width < 3 ||
                        newBox.height < 3 ||
                        newBox.x + newBox.width >
                            props.containerWidth + tolerance ||
                        newBox.y + newBox.height >
                            props.containerHeight + tolerance ||
                        newBox.x < -tolerance ||
                        newBox.y < -tolerance
                    )
                        return oldBox;

                    return newBox;
                }}
            />
        );

        htmlUtilityButtons = (
            <Html
                divProps={{
                    style: {
                        position: 'absolute',
                        top: konvaRectY + 'px',
                        left: konvaRectCenterX + 'px',
                        display: isDragging ? 'none' : 'block',
                    },
                }}
            >
                <Buttons
                    onDelete={props.onDelete}
                    onDeselect={props.onDeselect}
                />
            </Html>
        );
    }

    function transformStart() {
        setIsDragging(true);
    }

    function transformEnd() {
        setIsDragging(false);

        const curr = shapeRef.current;
        const scaleX = curr.scaleX();
        const scaleY = curr.scaleY();

        curr.scaleX(1);
        curr.scaleY(1);

        const newWidth = Math.max(10, curr.width() * scaleX);
        const newHeight = Math.max(10, curr.height() * scaleY);

        props.onChange({
            x: (curr.x() + newWidth / 2) / props.containerWidth,
            y: (curr.y() + newHeight / 2) / props.containerHeight,
            width: newWidth / props.containerWidth,
            height: newHeight / props.containerHeight,
        });
    }

    function dragStart() {
        setIsDragging(true);
    }

    function dragMove(e: Konva.KonvaEventObject<DragEvent>) {
        let tempX = Math.max(0, e.currentTarget.x());
        tempX = Math.min(props.containerWidth - e.currentTarget.width(), tempX);

        let tempY = Math.max(0, e.currentTarget.y());
        tempY = Math.min(
            props.containerHeight - e.currentTarget.height(),
            tempY
        );

        e.target.x(tempX);
        e.target.y(tempY);
    }

    function dragEnd(e: Konva.KonvaEventObject<DragEvent>) {
        setIsDragging(false);

        props.onChange({
            width: konvaRectWidth / props.containerWidth,
            height: konvaRectHeight / props.containerHeight,
            x: (e.target.x() + konvaRectWidth / 2) / props.containerWidth,
            y: (e.target.y() + konvaRectHeight / 2) / props.containerHeight,
        });
    }

    return (
        <Layer>
            <Rect
                {...props.shapeProps}
                onClick={props.onSelect}
                onTap={props.onSelect}
                ref={shapeRef}
                x={konvaRectX}
                y={konvaRectY}
                width={konvaRectWidth}
                height={konvaRectHeight}
                strokeScaleEnabled={false}
                draggable={props.isSelected}
                strokeWidth={Math.max(
                    5,
                    0.01 * Math.min(props.containerWidth, props.containerHeight)
                )}
                onDragMove={dragMove}
                onDragEnd={dragEnd}
                onDragStart={dragStart}
                onTransformStart={transformStart}
                onTransformEnd={transformEnd}
            />

            {transformer}
            {htmlUtilityButtons}
        </Layer>
    );
}
