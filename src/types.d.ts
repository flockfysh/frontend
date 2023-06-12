declare module '*.css';
declare module '*.svg';
declare module '*.jpg';
declare module '*.png';

// #region Datasets
declare interface Asset {
    _id: string;
    type: string;
    uploadedAt: Date;
    dataset: string;
    size: number;
    status: string;
    url: string;
    displayName: string;
}

declare interface PartialDataset {
    name: string;
    id: string;
    description: string;
    tags: string[];
    subTags: string[];
    numAssets: number;
}

type DatasetStage = 'untrained' | 'feedback' | 'completed'

declare interface Dataset extends PartialDataset {
    createdAt: Date;
    numTimesHumanFeedback: number,
    stage: DatasetStage;
    entityInfo: {
        itemCount: number;
        uploadedItemCount: number;
        feedbackItemCount: number;
        completedItemCount: number;
        size: number;
    }
}

declare interface AnnotationBox {
    x: number,
    y: number,
    width: number,
    height: number,
}

declare interface RemoteAnnotationObject {
    id: string,
    class: number,
    boundingBox: [number, number, number, number]
}

declare interface UploadedImage {
    id: string;
    url: string;
    uploaded: string;
    annotationData: RemoteAnnotationObject[];
    dataset: string;
    size: string;
    displayName: string;
}

// #endregion
declare interface Cost {
    timestamp: Date;
    description: string;
    amount: number;
    paid: boolean;
}

declare interface MonthlyCost {
    storage: number;
    creation: number;
    total: number;
    costs: Cost[];
}

declare interface BaseUser {
    fullName: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profilePhoto?: string;
}

declare interface User extends BaseUser {

}
