declare module '*.css';
declare module '*.svg';
declare module '*.jpg';
declare module '*.png';

// #region Datasets
declare interface ImageWithoutAnnotation {
    _id: string;
    url: string;
    displayName?: string;
}

declare interface PartialDataset {
    name: string;
    id: string;
    description: string;
    numImages: number;
}

declare interface Dataset extends PartialDataset {
    dateCreated: Date;
    plan: string;
    monthlyCost: MonthlyCost;
    classes: string[];
    numTimesHumanFeedback: number,
    state: string;
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
    name: string;
    email: string;
    profileImage: string;
    role?: string;
    phoneNumber?: number;
    dateOfBirth?: Date;
}

declare interface User extends BaseUser {
    monthlyCost: MonthlyCost;
    payments: Cost[];
    datasetIds?: number[];
}
