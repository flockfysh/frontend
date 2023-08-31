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
        <Image
            src="https://imagis.unsplash.com/photo-1601662528567-526cd06f6582?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2815&q=80"
            fill={ true }
            style={ { objectFit: 'cover', backgroundImage: gradientStyle, fontSize: 0, textIndent: '100%', overflow: 'hidden', whiteSpace: 'nowrap'  } }
            alt = "#"
            className= { className }
        />
  );
    
}
