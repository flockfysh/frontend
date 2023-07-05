export const MIN_WIDTH = 1024;

export const LABEL_COLORS = [
    '#28a11b',
    '#ffc338',
    '#ff4747',
    '#ff49a7',
    '#00A3FF',
    '#00CCFF',
];

export const DEBUG = process.env.DEBUG === 'true';

/* The CRA framework will automatically set process.env.NODE_ENV to development, which corresponds to debug mode. */
export const FRONTEND_URL = DEBUG
    ? 'http://localhost:3000'
    : 'https://flockfysh.tech';

export const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const _socketIOServerURL = new URL(serverURL);

if (_socketIOServerURL.protocol === 'http') _socketIOServerURL.protocol = 'ws';
else _socketIOServerURL.protocol = 'wss';

export const socketIOServerURL = _socketIOServerURL.toString();
