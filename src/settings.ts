export const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const _socketIOServerURL = new URL(serverURL);
if (_socketIOServerURL.protocol === 'http') {
    _socketIOServerURL.protocol = 'ws';
}
 else {
    _socketIOServerURL.protocol = 'wss';
}

export const socketIOServerURL = _socketIOServerURL.toString();
export const MIN_WIDTH = 1024;
