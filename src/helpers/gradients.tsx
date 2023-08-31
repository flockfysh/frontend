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
  
  const generateGradientStyle = (colors: string[], angle: number): string => {
    return `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`;
  };

export function RandomGradientComponent({ className } : {className: string}) {
  const [gradientColors, setGradientColors] = useState([]);
  const [gradientAngle, setGradientAngle] = useState<number>(0);

  useEffect(() => {
    const baseColor = generateVibrantColor();
    const paletteColors:any = [baseColor, generateVibrantColor()];
    setGradientColors(paletteColors);

    const randomAngle = Math.floor(Math.random() * 360);
    setGradientAngle(randomAngle);
  }, []);

  const gradientStyle = generateGradientStyle(gradientColors, gradientAngle);

  return (
    <div
        style={ {
            position: 'relative',
            width: '100%',
            height: '100vh',
            backgroundImage: gradientStyle,
        } }

        className= { className }

    >
        
       
    </div>
  );
    
}
