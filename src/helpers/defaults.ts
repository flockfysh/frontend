import { StaticImageData } from 'next/image';

import textDataset from '@/assets/defaults/datasets/textDataset.png';
import imageDataset from '@/assets/defaults/datasets/imageDataset.png';
import videoDataset from '@/assets/defaults/datasets/videoDataset.png';
import otherDataset from '@/assets/defaults/datasets/otherDataset.png';

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

export const RandomGradientComponent = () => {
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
        src="https://images.unsplash.com/photo-1564669722947-c89159202d19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
        layout="fill"
        objectFit="cover"
        style={{ backgroundImage: gradientStyle }}
      />
    </div>
  );
};

export function getDefaultDatasetThumbnail(datasetType: Flockfysh.AssetType) {
    const mapping: Record<Flockfysh.AssetType, StaticImageData> = {
        image: imageDataset,
        text: textDataset,
        video: videoDataset,
        other: otherDataset,
    };

    return mapping[datasetType];
}

export function getDefaultProfilePicture() {
    return 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29uJTIwcG9ydHJhaXQlMjBwaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60';
}
