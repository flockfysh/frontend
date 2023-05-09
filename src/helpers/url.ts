export function getBackendUrl(path: string) {
    return new URL(path, process.env.NEXT_PUBLIC_BACKEND_URL).toString();
}
