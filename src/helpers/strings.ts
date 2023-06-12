export function capitalize(raw: string) {
    if (!raw) {
        return '';
    }
    return raw[0].toUpperCase() + raw.slice(1).toLowerCase();
}
