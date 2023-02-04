import Konva from 'konva';
import {useRef, useEffect} from 'react';
import {Layer, Rect, Transformer} from 'react-konva';

export interface RectangleProps {
    shapeProps: Konva.NodeConfig & AnnotationBox,
    isSelected: boolean,
    onSelect: () => void,
    onChange: (shape: AnnotationBox) => void,
    containerWidth: number,
    containerHeight: number
}

export default function Rectangle(props: RectangleProps) {
    const shapeRef = useRef({} as Konva.Rect);
    const trRef = useRef({} as Konva.Transformer);

    useEffect(() => {
        if (props.isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer()!.batchDraw();
        }
    }, [props.isSelected]);

    const konvaRectWidth = props.shapeProps.width * props.containerWidth;
    const konvaRectHeight = props.shapeProps.height * props.containerHeight;
    const konvaRectX = (props.shapeProps.x - props.shapeProps.width / 2) * props.containerWidth;
    const konvaRectY = (props.shapeProps.y - props.shapeProps.height / 2) * props.containerHeight;

    return (
        <Layer>
            <Rect
                onClick={props.onSelect}
                onTap={props.onSelect}
                ref={shapeRef}
                {...props.shapeProps}
                x={konvaRectX}
                y={konvaRectY}
                width={konvaRectWidth}
                height={konvaRectHeight}
                strokeScaleEnabled={false}
                draggable={props.isSelected}
                strokeWidth={0.01 * Math.min(props.containerWidth, props.containerHeight)}
                onDragMove={
                    e => {
                        let tempX = Math.max(0, e.currentTarget.x());
                        tempX = Math.min(props.containerWidth - e.currentTarget.width(), tempX);

                        let tempY = Math.max(0, e.currentTarget.y());
                        tempY = Math.min(props.containerHeight - e.currentTarget.height(), tempY);

                        e.target.x(tempX);
                        e.target.y(tempY);
                    }
                }
                onDragEnd={
                    e => {
                        // This end function works.
                        props.onChange({
                            width: konvaRectWidth / props.containerWidth,
                            height: konvaRectHeight / props.containerHeight,
                            x: (e.target.x() + konvaRectWidth / 2) / props.containerWidth,
                            y: (e.target.y() + konvaRectHeight / 2) / props.containerHeight,
                        });
                    }
                }
                onTransform={
                    () => {
                    }
                }
                onTransformEnd={
                    _ => {
                        const curr = shapeRef.current;
                        const scaleX = curr.scaleX();
                        const scaleY = curr.scaleY();
                        curr.scaleX(1);
                        curr.scaleY(1);
                        const newWidth = Math.max(10, curr.width() * scaleX);
                        const newHeight = Math.max(10, curr.height() * scaleY);
                        props.onChange(
                            {
                                x: (curr.x() + newWidth / 2) / props.containerWidth,
                                y: (curr.y() + newHeight / 2) / props.containerHeight,
                                width: newWidth / props.containerWidth,
                                height: newHeight / props.containerHeight,
                            }
                        );
                    }
                }
            />

            {
                props.isSelected && (
                    <Transformer
                        ignoreStroke={true}
                        ref={trRef}
                        rotateEnabled={false}
                        boundBoxFunc={
                            (oldBox, newBox) => {
                                // console.log("Testing");
                                const tolerance = 0;

                                if (
                                    newBox.width < 3 ||
                                    newBox.height < 3 ||
                                    newBox.x + newBox.width > props.containerWidth + tolerance ||
                                    newBox.y + newBox.height > props.containerHeight + tolerance ||
                                    newBox.x < -tolerance ||
                                    newBox.y < -tolerance
                                ) return oldBox;

                                return newBox;
                            }
                        }
                    />
                )
            }
        </Layer>
    );
}
