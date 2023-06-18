declare module '*.css';
declare module '*.svg';
declare module '*.jpg';
declare module '*.png';

// #region Datasets

declare interface BaseUser {
    _id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profilePhoto?: string;
}

declare interface User extends BaseUser {

}

declare interface RedactedUser extends BaseUser {

}
