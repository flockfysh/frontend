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
