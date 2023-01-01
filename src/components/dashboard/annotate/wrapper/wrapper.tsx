import React, {FC} from 'react';
import Rectangle from './rectangle';
import { Stage, Layer } from 'react-konva';

interface Dimension{
  x: number,
  y: number,
  width: number,
  height: number
}
interface WrapperProps{
  rect: Dimension,
  imgWidth: number,
  imgHeight: number
}
const Wrapper: FC<WrapperProps> = ({rect, imgWidth, imgHeight}) => {
  const [rectangle, setRectangle] = React.useState({
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    stroke: 'green',
    strokeWidth: 4,
    id: 0
  });
  const [selectedId, selectShape] = React.useState<number | null>(null);
  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      style={{zIndex: 10}}
    >
      <Layer>
          <Rectangle
            shapeProps={rectangle}
            isSelected={selectedId!=null}
            onSelect={() => {
              selectShape(rectangle.id);
            }}
            onChange={(newAttrs: any) => {
              console.log(newAttrs);
              setRectangle(newAttrs);
            }}
            maxWidth={imgWidth}
            maxHeight={imgHeight}
            />
      </Layer>
    </Stage>
  );
};

export default Wrapper;