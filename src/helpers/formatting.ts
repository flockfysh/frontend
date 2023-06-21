export function formatFileSize(size: number) {
    const prefixes = ['', 'k', 'M', 'G', 'T', 'Pi'];
    let exponent = 0;

    while (size >= 1024) {
        size /= 1024;
        exponent++;
    }

    return `${ size.toFixed(2) } ${ prefixes[exponent] }B`;
}
