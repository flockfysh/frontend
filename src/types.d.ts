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
    email: string;
    profilePhoto?: {
        url: string;
        assetKey: string;
    };
    headerPhoto?: {
        url: string;
        assetKey: string;
    };
}

declare interface User extends BaseUser {
}

declare interface RedactedUser extends BaseUser {
}
