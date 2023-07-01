import api from '@/helpers/api';
import AsyncArray from '@/helpers/async';

export async function uploadAssets(
    datasetId: string,
    files: File[],
    config: {
        endpoint: string;
        fieldName: string;
    }
) {
    async function upload(file: File) {
        try {
            const fd = new FormData();
            fd.set(config.fieldName, file);
            await api.post(
                `/api/datasets/${datasetId}/assets/upload/${config.endpoint}`,
                fd
            );
        } catch (e) {}
    }

    await new AsyncArray(files).chunkMap((file) => upload(file), undefined, {
        maxThreads: 20,
    });
}

export async function uploadToPullRequest(
    pullRequestId: string,
    files: File[],
    config: {
        endpoint: string;
        fieldName: string;
    }
) {
    async function upload(file: File) {
        try {
            const fd = new FormData();
            fd.set(config.fieldName, file);
            await api.post(
                `/api/pullRequests/${pullRequestId}/assets/new/upload/${config.endpoint}`,
                fd
            );
        } catch (e) {}
    }

    await new AsyncArray(files).chunkMap((file) => upload(file), undefined, {
        maxThreads: 20,
    });
}

export const uploadTypeMapping: Record<
    Flockfysh.AssetType,
    {
        accept: string;
        extHints: string[];
        endpoint: string;
        fieldName: string;
    }
> = {
    image: {
        accept: 'image/*',
        extHints: ['.png', '.jpg', '.webp', '.jpeg'],
        endpoint: 'image',
        fieldName: 'image',
    },
    video: {
        accept: 'video/*',
        extHints: ['.mp4', '.mkv'],
        endpoint: 'video',
        fieldName: 'video',
    },
    text: {
        accept: 'text/*',
        extHints: ['.txt', '.js', '.csv', '.html', '.rtf'],
        endpoint: 'text',
        fieldName: 'text',
    },
    other: {
        accept: '',
        extHints: [
            '.png',
            '.jpg',
            '.webp',
            '.jpeg',
            '.bin',
            '.mp3',
            '.doc',
            '.pdf',
        ],
        endpoint: 'miscellaneous',
        fieldName: 'asset',
    },
};
