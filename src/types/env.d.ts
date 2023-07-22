declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_BACKEND_URL: string;
            NEXT_PUBLIC_DATASET_DOWNLOAD_LIMIT: number;
            NEXT_PUBLIC_DATASET_TRANSFER_LIMIT: number;
            NEXT_PUBLIC_API_CALL_LIMIT: number;
        }
    }
}

export {};
