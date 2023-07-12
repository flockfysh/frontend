import api from '@/helpers/api';

export async function genPurchaseUrl(datasetId: string) {
    return (await api.post<Api.Response<string>>(`/api/datasets/${datasetId}/purchase`)).data.data;
}
