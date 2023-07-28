import { SERVER_URL, serverURL } from '@/settings';

export function getBackendUrl(path: string) {
    return new URL(path, SERVER_URL).toString();
}
