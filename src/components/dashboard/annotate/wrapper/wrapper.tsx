import { useState } from 'react';
import Rectangle from './rectangle';
import { Stage, Layer } from 'react-konva';

interface Dimension{
  x: number;
  y: number;
  width: number;
  height: number;
}

interface WrapperProps{
  rect: Dimension;
  imgWidth: number;
  imgHeight: number;
}

export default function Wrapper(props: WrapperProps) {
  const [rectangle, setRectangle] = useState(
    {
      x: props.rect.x,
      y: props.rect.y,
      width: props.rect.width,
      height: props.rect.height,
      stroke: 'green',
      strokeWidth: 4,
      id: 0
    }
  );

  const [selectedId, selectShape] = useState(-1);
  
  function checkDeselect(e: any) {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();

    if (clickedOnEmpty) selectShape(-1);
  };
  
  return (
    <Stage
      width={ window.innerWidth }
      height={ window.innerHeight }
      onMouseDown={ checkDeselect }
      onTouchStart={ checkDeselect }
      style={ { zIndex: 10 } }
    >
      <Layer>
          <Rectangle
            shapeProps={ rectangle }
            isSelected={ selectedId !== -1 }
            onSelect={
              () => selectShape(rectangle.id)
            }
            onChange={ 
              (newAttrs: any) => setRectangle(newAttrs)
            }
            maxWidth={ props.imgWidth }
            maxHeight={ props.imgHeight }
            />
      </Layer>
    </Stage>
  );
};
