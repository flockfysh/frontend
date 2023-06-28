import { useState, useLayoutEffect } from 'react';

import * as BrowserFS from 'browserfs';
import { Stats } from 'fs';

let _window: Window | null = null;
try {
    _window = window;
}
 catch (e) {
    _window = null;
}

// Make sure this function is used client-side.
export default function useBrowserFS() {
    const [state, setState] = useState<Awaited<
        ReturnType<typeof module>
    > | null>(null);

    async function module() {
        const fs = BrowserFS.BFSRequire('fs');
        const path = BrowserFS.BFSRequire('path');
        const promisesLib: {
            readdir(path: string): Promise<string[]>;
            unlink(path: string): Promise<void>;
            writeFile(filename: string, data: any): Promise<void>;
            writeFile(
                filename: string,
                data: any,
                encoding?: string
            ): Promise<void>;
            writeFile(
                filename: string,
                data: any,
                options?: {
                    encoding?: string;
                    mode?: string | number;
                    flag?: string;
                }
            ): Promise<void>;
            readFile(filename: string): Promise<Buffer>;
            readFile(
                filename: string,
                options: { flag?: string }
            ): Promise<Buffer>;
            readFile(
                filename: string,
                options: { encoding: string; flag?: string }
            ): Promise<string>;
            readFile(filename: string, encoding: string): Promise<string>;
            rmdir(
                path: string,
                options?: { recursive?: boolean }
            ): Promise<void>;
            purgeDir(path: string): Promise<void>;
            stat(path: string): Promise<Stats>;
            mkdir(path: string, mode?: any): Promise<void>;
            skipError<T>(promise: Promise<T>): Promise<T | void>;
        } = {
            readdir(path) {
                return new Promise((resolve, reject) => {
                    fs.readdir(path, (e, result) => {
                        if (e) return reject(e);
                        resolve(result!);
                    });
                });
            },
            unlink(path: string) {
                return new Promise((resolve, reject) => {
                    fs.unlink(path, (e) => {
                        if (e) return reject(e);
                        resolve();
                    });
                });
            },
            writeFile(path: string, data: any, arg3: any = {}) {
                return new Promise<void>((resolve, reject) => {
                    fs.writeFile(path, data, arg3, (e) => {
                        if (e) return reject(e);
                        resolve();
                    });
                });
            },
            readFile(path: string, arg2?: any) {
                return new Promise<any>((resolve, reject) => {
                    fs.readFile(path, arg2, (e, data) => {
                        if (e) return reject(e);
                        resolve(data);
                    });
                });
            },
            async rmdir(pathName: string, options) {
                if (!options) options = {};
                options.recursive ??= false;

                if (!options.recursive) {
                    return new Promise<void>((resolve, reject) => {
                        fs.rmdir(pathName, (e) => {
                            if (e) reject(e);
                            resolve();
                        });
                    });
                }
                else {
                    await promisesLib.purgeDir(pathName);
                    await promisesLib.rmdir(pathName, {
                        recursive: false,
                    });
                }
            },
            async purgeDir(pathName: string) {
                const children = await promisesLib.readdir(pathName);
                const promises: Promise<void>[] = [];
                for (const child of children) {
                    const childPath = path.join(pathName, child);
                    const stat = await promisesLib.stat(childPath);
                    if (stat.isDirectory()) {
                        promises.push(
                            promisesLib.rmdir(childPath, {
                                recursive: true,
                            })
                        );
                    }
                    else {
                        promises.push(promisesLib.unlink(childPath));
                    }
                }
                await Promise.all(promises);
            },
            stat(path: string) {
                return new Promise<any>((resolve, reject) => {
                    fs.stat(path, (e, stats) => {
                        if (e) return reject(e);
                        resolve(stats!);
                    });
                });
            },
            mkdir(path: string, mode?: any) {
                return new Promise<void>((resolve, reject) => {
                    fs.mkdir(path, mode, (e) => {
                        if (e) return reject(e);
                        resolve();
                    });
                });
            },
            async skipError(promise) {
                try {
                    return await promise;
                }
                catch (e) {}
            },
        };
        await promisesLib.purgeDir('/tmp');
        await promisesLib.skipError(promisesLib.mkdir('/tmp'));
        await promisesLib.skipError(promisesLib.mkdir('/tmp/download'));
        return {
            fs: fs,
            path: path,
            fsPromises: promisesLib,
            process: BrowserFS.BFSRequire('process'),
        };
    }

    useLayoutEffect(() => {
        if (_window) {
            BrowserFS.install(_window);
            BrowserFS.configure(
                {
                    fs: 'IndexedDB',
                    options: {},
                },
                async (_) => {
                    setState(await module());
                }
            );
        }
    }, []);

    return state;
}
