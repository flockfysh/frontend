import axios, { AxiosError } from 'axios';

import { ApiError, PrivateBetaError } from './errors';
import { AUTH_SERVER_URL, SERVER_URL } from '../settings';

const api = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
    responseType: 'json',
});

api.interceptors.response.use(
    undefined,
    function (
        error: AxiosError<{
            success: false;
            error: {
                message: string;
                code: string;
            };
        }>
    ) {
        const rawError = error.response?.data.error;
        const message = rawError?.message;
        const code = rawError?.code;

        if (code === 'ERROR_PRIVATE_BETA')
            return Promise.reject(new PrivateBetaError(message ?? '', code));
        else return Promise.reject(new ApiError(message ?? '', code ?? ''));
    }
);

export default api;
