declare module '*.css';
declare module '*.svg';
declare module '*.jpg';

// #region Datasets

declare interface DatasetImage {
    url: string;
    name: string;
}

declare interface PartialDataset {
    name: string;
    id: string;
    description: string;

    itemCount: number; // !: What is item count?
}

declare interface Dataset extends PartialDataset {
    dateCreated: Date;
    plan: string;
    size: number;

    monthlyCost: MonthlyCost;

    uploadedImages: DatasetImage[];
    datasetImages: DatasetImage[];
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
