export const MIN_WIDTH = 1024;

export const LABEL_COLORS = ['#28a11b',
    '#ffc338',
    '#ff4747',
    '#ff49a7',
    '#00A3FF',
    '#00CCFF',
];

export const DEBUG = process.env.NODE_ENV === 'development';

/* The CRA framework will automatically set process.env.NODE_ENV to development, which corresponds to debug mode. */
export const baseURL =
    DEBUG ? 'http://localhost:3000' : 'https://flockfysh.tech';

export const serverURL =
    DEBUG ? 'http://localhost:8000' : 'https://api.flockfysh.tech';

const _socketIOServerURL = new URL(serverURL);
_socketIOServerURL.protocol = DEBUG ? 'ws' : 'wss';

export const socketIOServerURL = _socketIOServerURL.toString();
