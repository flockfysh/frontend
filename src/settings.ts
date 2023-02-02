export const MIN_WIDTH = 1024;

export const DEBUG = process.env.DEBUG?.toLowerCase();

export const baseURL =
  process.env.DEBUG?.toLowerCase() === 'true' ? 'http://localhost:3000' : '';
  
export const serverURL =
  process.env.DEBUG?.toLowerCase() === 'true' ? 'http://localhost:8000' : '';
