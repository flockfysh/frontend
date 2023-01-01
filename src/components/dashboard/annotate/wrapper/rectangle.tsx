import React, { FC } from 'react';
import { Rect, Transformer } from 'react-konva';

interface RectangleProps{
  shapeProps: any,
  isSelected: boolean,
  onSelect: any,
  onChange: any,
  maxWidth: number,
  maxHeight: number
}
const Rectangle: FC<RectangleProps> = ({ shapeProps, isSelected, onSelect, onChange, maxWidth, maxHeight }) => {
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();
  React.useEffect(() => {
    if (isSelected) {
      trRef?.current?.nodes([shapeRef.current]);
      trRef?.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragMove={(e)=>{
          let tempX = Math.max(0,e.target.x());
          tempX = Math.min(maxWidth-e.target.width(), tempX);
          let tempY = Math.max(0,e.target.y());
          tempY = Math.min(maxHeight-e.target.height(), tempY);
          e.target.x(tempX);
          e.target.y(tempY);
        }}
        onDragEnd={(e) => {
          console.log(maxWidth, e.target.x());
          onChange({
            ...shapeProps,
            x: Math.max(0,e.target.x()),
            y: e.target.y(),
          });
        }}
        onTransform={(e)=>{

        }}
        onTransformEnd={(e) => {
          const curr = shapeRef.current;
          const scaleX = curr.scaleX();
          const scaleY = curr.scaleY();
          curr.scaleX(1);
          curr.scaleY(1);
          onChange({
            ...shapeProps,
            x: curr.x(),
            y: curr.y(),
            width: Math.max(10, curr.width() * scaleX),
            height: Math.max(10, curr.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            const tolerance = 5;
            console.log(newBox.width+newBox.x);
            if (newBox.width < 3 || newBox.height < 3 || newBox.x+newBox.width>maxWidth+tolerance || newBox.y+newBox.height>maxHeight+tolerance || newBox.x<-tolerance || newBox.y<-tolerance) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Rectangle;