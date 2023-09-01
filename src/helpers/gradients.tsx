import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateColorPalette = (baseColor:any) => {
  const complementaryColor = `#${(0xFFFFFF ^ parseInt(baseColor.slice(1), 16)).toString(16).padStart(6, '0')}`;
  return [baseColor, complementaryColor];
};

const generateVibrantColor = (): string => {
    const h = Math.random() * 360;
    const s = 70 + Math.random() * 20; // Adjust saturation for vibrancy
    const l = 50 + Math.random() * 20; // Adjust lightness for vibrancy
    return `hsl(${h},${s}%,${l}%)`;
  };
  
  const generateGradientStyle = (type: string, colors: string[], angle: number): string => {
    if (type === 'linear') {
      return `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`;
    }
 else if (type === 'radial') {
      return `radial-gradient(${colors[0]}, ${colors[1]})`;
    }
 else if (type === 'conic') {
      return `conic-gradient(from ${angle}deg at 50% 50%, ${colors[0]}, ${colors[1]})`;
    }
    return '';
  };
  

interface GradientProps {
  className: string
}


export function RandomGradientComponent(props : GradientProps) {
  const [gradientColors, setGradientColors] = useState([]);
  const [gradientAngle, setGradientAngle] = useState<number>(0);
  const [gradientType, setGradientType] = useState<string>('linear');

  useEffect(() => {
    const baseColor = generateVibrantColor();
    const paletteColors:any = [baseColor, generateVibrantColor()];
    setGradientColors(paletteColors);

    const randomAngle = Math.floor(Math.random() * 360);
    setGradientAngle(randomAngle);

    const randomType = Math.random();
    if (randomType < 0.33) {
      setGradientType('linear');
    }
 else if (randomType < 0.66) {
      setGradientType('radial');
    }
 else {
      setGradientType('conic');
    }


  }, []);

  const gradientStyle = generateGradientStyle(gradientType, gradientColors, gradientAngle);

  return (
    <div
        style={ {
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            backgroundImage: gradientStyle,
        } }

        className= { props.className }

    >
        
       
    </div>
  );
    
}



export function RandomGradientContainer(props : any) {
  const [gradientColors, setGradientColors] = useState([]);
  const [gradientAngle, setGradientAngle] = useState<number>(0);
  const [gradientType, setGradientType] = useState<string>('linear');

  useEffect(() => {
    const baseColor = generateVibrantColor();
    const paletteColors:any = [baseColor, generateVibrantColor()];
    setGradientColors(paletteColors);

    const randomAngle = Math.floor(Math.random() * 360);
    setGradientAngle(randomAngle);

    const randomType = Math.random();
    if (randomType < 0.33) {
      setGradientType('linear');
    }
 else if (randomType < 0.66) {
      setGradientType('radial');
    }
 else {
      setGradientType('conic');
    }


  }, []);

  const gradientStyle = generateGradientStyle(gradientType, gradientColors, gradientAngle);

  return (
    <div
        style={ {
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundImage: gradientStyle,
        } }

        className= { props.className }

    >
        { props.children }
    </div>
  );
    
}
