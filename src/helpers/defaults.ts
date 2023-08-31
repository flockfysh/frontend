import { StaticImageData } from 'next/image';

import textDataset from '@/assets/defaults/datasets/textDataset.png';
import imageDataset from '@/assets/defaults/datasets/imageDataset.png';
import videoDataset from '@/assets/defaults/datasets/videoDataset.png';
import otherDataset from '@/assets/defaults/datasets/otherDataset.png';

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
