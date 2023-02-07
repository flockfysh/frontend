export const MIN_WIDTH = 1024;

export const LABEL_COLORS = ['#28a11b',
    '#ffc338',
    '#ff4747',
    '#ff49a7',
    '#00A3FF',
    '#00CCFF'
];

export const DEBUG = process.env.DEBUG?.toLowerCase();

/* The CRA framework will automatically set process.env.NODE_ENV to development, which corresponds to debug mode. */
export const baseURL =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

export const serverURL =
    process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '';