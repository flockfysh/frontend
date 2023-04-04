import axios, { AxiosError } from 'axios';
import { serverURL } from '../settings';
import { PrivateBetaError } from './errors';

const api = axios.create({
    baseURL: serverURL,
    withCredentials: true,
    responseType: 'json',
});

api.interceptors.response.use(undefined, function (error: AxiosError<{
    success: false,
    error: {
        message: string,
        code: string
    }
}>) {
    const rawError = error.response?.data.error;
    const message = rawError?.message;
    const code = rawError?.code;

    if (code === 'ERROR_PRIVATE_BETA') {
        return Promise.reject(new PrivateBetaError(message));
    }
    else {
        return Promise.reject(new Error(message));
    }
});

export default api;
