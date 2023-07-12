declare interface HomepagePost extends Flockfysh.Post {
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
