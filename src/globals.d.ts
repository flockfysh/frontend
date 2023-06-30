declare global {
    namespace Flockfysh {
        type AnnotationTool = 'boundingBox' | 'ellipse' | 'polygon' | 'line';
        type AssetStage = 'uploaded' | 'feedback' | 'completed';
        type DatasetStage = 'untrained' | 'feedback' | 'completed';
        type AssetType = 'image' | 'video' | 'text' | 'other';
        type PullRequestStatus = 'draft' | 'published' | 'merged' | 'rejected';

        interface PullRequest {
            _id: string;
            dataset: string;
            name: string;
            description?: string;
            createdAt: string;
            updatedAt: string;
            user: string;
            status: Flockfysh.PullRequestStatus;
        }

        interface Label {
            _id: string;
            name: string;
            tag: string;
            color: string;
            tool: Flockfysh.AnnotationTool;
        }

        interface Recipe {
            _id: string;
            name: string;
            immutable: boolean;
            user: string;
            createdAt: Date;
        }

        interface RecipeWithLabels extends Recipe {
            labels: Flockfysh.Label[];
        }

        interface Dataset {
            _id: string;
            name: string;
            description?: string;
            tags: string[];
            subTags: string[];
            user: string;
            type: Flockfysh.AssetType;
            stage: Flockfysh.DatasetStage;
            createdAt: Date;
            price: number;
            public: boolean;
            updatedAt: Date;
            thumbnail?: {
                assetId: string;
            };
            icon?: {
                assetId: string;
            };
            metrics: {
                views: number;
                downloads: number;
            };
        }

        interface Collection {
            _id: string;
            type: string;
            name: string;
            user: string;
            thumbnail?: {
                assetId: string;
            };
            icon?: {
                assetId: string;
            };
        }

        interface PullRequest {
            _id: string;
            name: string;
            createdAt: string;
            updatedAt: string;
            user: string;
            dataset: string;
            status: string;
        }

        interface PullRequestMessage {
            message: string;
            createdAt: string;
            updatedAt: string;
            user: string;
            pullRequest: string;
        }

        interface PopulatedDataset extends Dataset {
            size: Flockfysh.DatasetSize;
            assetCounts: Flockfysh.DatasetAssetCounts;
            annotationCounts: Flockfysh.DatasetAnnotationCounts;
        }

        interface DatasetAssetCounts {
            byStage: Record<Flockfysh.AssetStage, number>;
            total: number;
            byAnnotationStatus: {
                annotated: number;
                unannotated: number;
            };
            byMimetype: Record<string, number>;
        }

        interface DatasetAnnotationCounts {
            total: number;
        }

        interface DatasetSize {
            byStage: Record<Flockfysh.AssetStage, number>;
            total: {
                cloud: number;
                cluster: number;
                total: number;
            };
        }

        interface Asset {
            _id: string;
            type: Flockfysh.AssetType;
            stage: Flockfysh.AssetStage;
            uploadedAt: Date;
            dataset: string;
            size: number;
            url: string;
            mimetype: string;
            displayName: string;
        }
    }

    namespace Api {
        interface Response<T> {
            success: true;
            data: T;
        }

        interface PaginatedResponse<T> {
            success: true;
            data: T;
            meta: {
                previous?: string;
                next?: string;
                hasPrevious: boolean;
                hasNext: boolean;
            };
        }
    }
}

export {};
