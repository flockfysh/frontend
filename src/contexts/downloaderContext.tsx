import { createContext, useState, useCallback } from 'react';

import path from 'path';
import mime from 'mime-types';
import { downloadZip } from 'client-zip';

import api from '@/helpers/api';

interface DownloadJob {
    current: number;
    total: number;
    eta?: number;
}

export const DownloaderContext = createContext<{
    downloadDataset: (id: string) => void;
}>({
    downloadDataset: () => {
        throw new Error();
    },
});

export function DownloaderWrapper(props: React.PropsWithChildren) {
    const [_state, _setState] = useState<{
        jobs: Map<string, DownloadJob>;
    }>({
        jobs: new Map(),
    });

    const downloadDataset = useCallback(async (datasetId: string) => {
        const paginationState: { next?: string } = {};
        const promises = [];

        do {
            const result = (
                await api.get<Api.PaginatedResponse<Flockfysh.Asset[]>>(
                    `/api/datasets/${datasetId}/assets`,
                    {
                        params: {
                            limit: 20,
                            next: paginationState.next,
                        },
                    }
                )
            ).data;

            if (result.meta.hasNext) paginationState.next = result.meta.next;
            else paginationState.next = undefined;

            for (const asset of result.data) {
                promises.push({
                    _id: asset._id,
                    response: fetch(asset.url),
                });
            }
        } while (paginationState.next);

        const transformed = await Promise.all(
            promises.map(async (downloadItem) => {
                const response = await downloadItem.response;
                const extension = mime.extension(
                    response.headers.get('content-type') as string
                );

                const filename = extension
                    ? `${downloadItem._id}.${extension}`
                    : `${downloadItem._id}`;

                return {
                    name: path.join('/assets', filename),
                    input: response,
                };
            })
        );
        const blob = await downloadZip(transformed).blob();
        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);
        link.download = `Dataset ${datasetId}.zip`;
        link.click();
        link.remove();
        
        await api.post(`/api/datasets/${datasetId}/metrics`, {
            type: 'download',
        });
    }, []);

    return (
        <DownloaderContext.Provider
            value={ {
                downloadDataset,
            } }
        >
            { props.children }
        </DownloaderContext.Provider>
    );
}
