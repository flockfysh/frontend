declare module '*.css';
declare module '*.svg';
declare module '*.jpg';

// #region Datasets

declare interface DatasetImage {
    url: string;
    name: string;
}

declare interface PartialDataset {
    id: string;
    name: string;
    description: string;
    numImages: number;
}

declare interface Dataset extends PartialDataset {
    dateCreated: Date;
    plan: string; // ? Consider using an ENUM instead
    size: number;

    monthlyCost: MonthlyCost;
    classes: string[];
    uploadedImages: DatasetImage[];
    datasetImages: DatasetImage[];
}

declare interface AnnotationBox {
    x: number,
    y: number,
    width: number,
    height: number,
}

declare interface RemoteAnnotationObject {
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
}
