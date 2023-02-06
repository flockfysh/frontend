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
    
    uploadedImages: DatasetImage[]; // Images uploaded by the user
    datasetImages: DatasetImage[];
}

declare interface AnnotationBox {
    class: number,
    boundingBox: [number, number, number, number]
}

declare interface UploadedImage {
    id: string;
    url: string;
    uploaded: string;
    annotationData: AnnotationBox[];
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
