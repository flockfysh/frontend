import Konva from 'konva';
import { useRef, useEffect } from 'react';
import { Rect, Transformer } from 'react-konva';

interface RectangleProps{
  shapeProps: any,
  isSelected: boolean,
  onSelect: any,
  onChange: any,
  maxWidth: number,
  maxHeight: number
}

export default function Rectangle(props: RectangleProps) {
  const shapeRef = useRef({} as Konva.Layer);
  const trRef = useRef({} as Konva.Transformer);

  useEffect(() => {
    if (props.isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()!.batchDraw();
    }
  }, [props.isSelected]);

  return (
    <>
      <Rect
        onClick={ props.onSelect }
        onTap={ props.onSelect }
        ref={ shapeRef }
        { ...props.shapeProps }
        draggable
        onDragMove={
          e => {
            let tempX = Math.max(0, e.target.x());
            tempX = Math.min(props.maxWidth - e.target.width(), tempX);

            let tempY = Math.max(0, e.target.y());
            tempY = Math.min(props.maxHeight - e.target.height(), tempY);

            e.target.x(tempX);
            e.target.y(tempY);
          }
        }
        onDragEnd={
          e => {
            props.onChange({
              ...props.shapeProps,
              x: Math.max(0, e.target.x()),
              y: e.target.y(),
            });
          }
        }
        onTransform={
          e => {

          }
        }
        onTransformEnd={
          e => {
            const curr = shapeRef.current;
            const scaleX = curr.scaleX();
            const scaleY = curr.scaleY();
            curr.scaleX(1);
            curr.scaleY(1);

            props.onChange(
              {
                ...props.shapeProps,
                x: curr.x(),
                y: curr.y(),
                width: Math.max(10, curr.width() * scaleX),
                height: Math.max(10, curr.height() * scaleY),
              }
            );
          }
        }
      />

      {
        props.isSelected && (
          <Transformer
            ref={ trRef }
            boundBoxFunc={
              (oldBox, newBox) => {
                const tolerance = 5;

                if (
                  newBox.width < 3 || 
                  newBox.height < 3 || 
                  newBox.x + newBox.width > props.maxWidth + tolerance || 
                  newBox.y + newBox.height > props.maxHeight + tolerance || 
                  newBox.x < -tolerance || 
                  newBox.y < -tolerance
                ) {
                  return oldBox;
                }

                return newBox;
              }
            }
          />
        )
      }
    </>
  );
};
