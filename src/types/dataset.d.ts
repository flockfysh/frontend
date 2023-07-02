declare interface HomepageDataset extends Flockfysh.Dataset {
    assetCounts: Flockfysh.DatasetAssetCounts;
    size: Flockfysh.DatasetSize;
    likes: number;
    user: RedactedUser;
    thumbnail?: {
        assetKey: string;
        url: string;
    };
    icon?: {
        assetKey: string;
        url: string;
    };
}

declare interface PreviewDataset extends Flockfysh.Dataset {
    size: Flockfysh.DatasetSize;
    assetCounts: Flockfysh.DatasetAssetCounts;
    annotationCounts: Flockfysh.DatasetAnnotationCounts;
    user: RedactedUser;
    contributors: number;
    thumbnail?: {
        assetId: string;
        url: string;
    };
    icon?: {
        assetId: string;
        url: string;
    };
    permission: string;
}


