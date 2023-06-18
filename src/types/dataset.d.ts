declare interface HomepageDataset extends Flockfysh.Dataset {
    assetCounts: Flockfysh.DatasetAssetCounts,
    size: Flockfysh.DatasetSize,
    likes: number,
    user: RedactedUser,
}

