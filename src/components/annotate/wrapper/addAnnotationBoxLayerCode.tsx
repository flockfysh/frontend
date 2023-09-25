import { useRef, useState } from 'react';

import Konva from 'konva';
import { Layer, Rect } from 'react-konva';

/**
 * This canvas layer allows the user to create new annotation rectangles
 * by dragging-and-dropping on the image canvas.
 * One rectangle covers the screen and moves around as the user drags,
 * and moves backs to the old position right after the user drops.
 * The other rectangle acts as the preview.
 *
 * @param props.width The width of the annotation box layer. Should cover the whole stage.
 * @param props.height The height of the annotation box layer. Should cover the whole stage.
 * @param props.onAdd This function will be called with the normalized coordinates of the annotation box.
 * @constructor
 */
export default function AddAnnotationBoxLayer(props: {
    width: number;
    height: number;
    onAdd?: (normalizedCoordinates: AnnotationBox) => void;
}) {
    const [isDragging, setIsDragging] = useState(false);

    const start = useRef<{ sX: number; sY: number }>({ sX: 0, sY: 0 });
    const end = useRef<{ eX: number; eY: number }>({ eX: 0, eY: 0 });

    const internalRectRef = useRef<Konva.Rect>(null);

    function boundCoordinates(coords: number, lower: number, upper: number) {
        if (coords < lower) coords = lower;
        if (coords > upper) coords = upper;

        return coords;
    }

    function getRectCoords() {
        const { sX, sY } = start.current;
        const { eX, eY } = end.current;

        const leftX = sX < eX ? sX : eX;
        const topY = sY < eY ? sY : eY;
        const width = Math.abs(eX - sX);
        const height = Math.abs(eY - sY);

        return { leftX, topY, width, height };
    }

    function updateRectangle() {
        const internalRect = internalRectRef.current!;
        const { leftX, topY, width, height } = getRectCoords();

        internalRect.x(leftX);
        internalRect.y(topY);
        internalRect.width(width);
        internalRect.height(height);
    }

    return (
        <Layer>
            <Rect
                ref={ internalRectRef }
                stroke="red"
                strokeWidth={ 4 }
                opacity={ isDragging ? 1 : 0 }
            />

            <Rect
                draggable
                x={ 0 }
                y={ 0 }
                strokeScaleEnabled={ false }
                width={ props.width }
                height={ props.height }
                onMouseDown={ (e:any) => {
                    const { x, y } = e.currentTarget
                        .getStage()!
                        .getRelativePointerPosition();

                    start.current.sX = x;
                    start.current.sY = y;
                } }
                onDragStart={ () => {
                    setIsDragging(true);
                    updateRectangle();
                } }
                onDragMove={ (e) => {
                    const stage = e.currentTarget.getStage()!;
                    let { x, y } = stage.getRelativePointerPosition();

                    x = boundCoordinates(x, 0, stage.width());
                    y = boundCoordinates(y, 0, stage.height());
                    end.current.eX = x;
                    end.current.eY = y;

                    updateRectangle();
                } }
                onDragEnd={ (e) => {
                    const rectangle = e.currentTarget;

                    rectangle.x(0);
                    rectangle.y(0);

                    setIsDragging(false);

                    const { sX, sY } = start.current;
                    const { eX, eY } = end.current;

                    const width = Math.abs(sX - eX);
                    const height = Math.abs(sY - eY);
                    const stage = rectangle.getStage()!;
                    const stageWidth = stage.width();
                    const stageHeight = stage.height();
                    const normalizedX = (sX + eX) / 2 / stageWidth;
                    const normalizedY = (sY + eY) / 2 / stageHeight;
                    const normalizedWidth = width / stageWidth;
                    const normalizedHeight = height / stageHeight;

                    if (normalizedHeight < 0.02 || normalizedHeight < 0.02)
                        return;

                    const coords = {
                        x: normalizedX,
                        y: normalizedY,
                        width: normalizedWidth,
                        height: normalizedHeight,
                    };

                    props.onAdd?.(coords);
                } }
            />
        </Layer>
    );
}
