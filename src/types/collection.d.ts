declare interface HomepageCollection extends Flockfysh.Collection {
    itemCount: number;
    thumbnail?: {
        assetId: string;
        url: string;
    };
    icon?: {
        assetId: string;
        url: string;
    };
    user: RedactedUser;
}
