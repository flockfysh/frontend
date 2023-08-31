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

const generateGradientStyle = (colors:any) => {
  return `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`;
};

export function RandomGradientComponent({ className } : {className: string}) {
  const [gradientColors, setGradientColors] = useState([]);

  useEffect(() => {
    const baseColor = generateRandomColor();
    const paletteColors:any = generateColorPalette(baseColor);
    setGradientColors(paletteColors);
  }, []);

  const gradientStyle = generateGradientStyle(gradientColors);

  return (
    <div>
        <div style={ gradientStyle }>
        </div>
        
    </div>
  );
    
}
