import { SERVER_URL } from '@/settings';

export function getBackendUrl(path: string) {
    return new URL(path, SERVER_URL).toString();
}
