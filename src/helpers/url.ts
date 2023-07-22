import { SERVER_URL, serverURL } from '@/settings';

export function getBackendUrl(path: string) {
    console.log(path, SERVER_URL)
    return new URL(path, SERVER_URL).toString();
}
