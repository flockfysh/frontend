export function formatFileSize(size: number) {
    const prefixes = ['', 'ki', 'Mi', 'Gi', 'Ti', 'Pi'];
    let exponent = 0;

    while (size >= 1024) {
        size /= 1024;
        exponent++;
    }

    return `${size.toPrecision(2)}${prefixes[exponent]}B`;
}
