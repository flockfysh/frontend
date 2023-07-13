export function arrayBufferToString(buffer: ArrayBuffer) {
    // convert to base64 string
    const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));

    return base64String;
}
