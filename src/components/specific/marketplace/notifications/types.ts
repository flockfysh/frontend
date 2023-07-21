export interface IBellNotification {
    target: string; // target user
    origin?: {
        name: string;
        picture: string;
        id: string;
    }; // origin user
    text: string; // notification text
    picture?: string; // link to notification image
    resource: 'Contributions'; // link to relevant entity of concern
    link?: string; // link to notification
    createdAt: Date;
}
