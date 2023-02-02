declare module '*.css';
declare module '*.svg';
declare module '*.jpg';

// #region Datasets
declare interface DatasetImage {
    url: string;
    name: string;
    displayName?: string;
}

declare interface PartialDataset {
    name: string;
    id: string;
    description: string;
    itemCount: number; // How many items are there in the database. To be honest, it should have been reserved for datasetImages instead of uploadedImages.
}

declare interface Dataset extends PartialDataset {
    dateCreated: Date;
    plan: string;
    size: number;
    monthlyCost: MonthlyCost;
    uploadedImages: DatasetImage[];
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

    datasetIds?: number[]; // ! make not optional 
}
