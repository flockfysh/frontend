// TODO: Fix this
declare type AnnotationBox = any;
declare type UploadedImage = any;
declare module 'boring-avatars';

declare interface BaseActivity {
    id: string;
    date: Date;
    action: 'added' | 'removed' | 'uploaded' | 'initiated';
    numFiles: number;
    size: number;
    type: Flockfysh.AssetType;
}

declare interface UserActivity extends BaseActivity {
    dataset: string;
}

declare interface DatasetActivity extends BaseActivity {
    userName: string; // TODO: change to user type
}

declare interface BaseUser {
    _id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    username: string;
    signupDate: Date;
    email: string;
    profilePhoto?: {
        url: string;
        assetKey: string;
    };
    headerPhoto?: {
        url: string;
        assetKey: string;
    };
    bio: string;
    apiData: {
        apiKey: String;
        downloadCount: number;
        transferAmount: number;
        apiCount: number;
    }
}

declare interface User extends BaseUser {}

declare interface RedactedUser extends BaseUser {}
