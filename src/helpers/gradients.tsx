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

const generateColorPalette = (baseColor) => {
  const complementaryColor = `#${(0xFFFFFF ^ parseInt(baseColor.slice(1), 16)).toString(16).padStart(6, '0')}`;
  return [baseColor, complementaryColor];
};

const generateGradientStyle = (colors) => {
  return `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`;
};

export function RandomGradientComponent({ className } : {className: string}) {
  const [gradientColors, setGradientColors] = useState([]);

  useEffect(() => {
    const baseColor = generateRandomColor();
    const paletteColors = generateColorPalette(baseColor);
    setGradientColors(paletteColors);
  }, []);

  const gradientStyle = generateGradientStyle(gradientColors);

  return (
    <div>
        <Image
            src="https://images.unsplash.com/photo-1579818277076-1abc45c9471f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80"
            layout="fill"
            objectFit="cover"
            className= { className }
            style={ { backgroundImage: gradientStyle } }
        />
    </div>
  );
    
}
