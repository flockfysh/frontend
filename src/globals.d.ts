declare global {
    namespace Flockfysh {
        type AnnotationTool = 'boundingBox' | 'ellipse' | 'polygon' | 'line';

        interface Label {
            _id: string;
            name: string;
            tag: string;
            color: string;
            tool: Flockfysh.AnnotationTool,
        }

        interface Recipe {
            _id: string;
            name: string;
            immutable: boolean;
            user: string;
            createdAt: Date;
        }

        interface RecipeWithLabels extends Recipe {
            labels: Flockfysh.Label[]
        }
    }

    namespace Api {
        interface Response<T> {
            success: true,
            data: T,
        }
    }
}

export {};
