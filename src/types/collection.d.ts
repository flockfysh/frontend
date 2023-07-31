declare interface HomepageCollection extends Flockfysh.Collection {
    id: Key | null | undefined;
    itemCount: number;
    thumbnail?: {
        assetId: string;
        url: string;
    };
    icon?: {
        assetId: string;
        url: string;
    };
    user: User;
}
