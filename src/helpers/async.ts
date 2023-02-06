/***/
export default class AsyncArray<T> extends Array {
    constructor(iterable: T[]) {
        super();
        this.push(...iterable);
    }

    async chunkMap<U>(callback: (value: T, index?: number, array?: T[]) => Promise<U> | U, thisArg?: any, params?: {
        maxThreads?: number,
        verbose?: true,
    }): Promise<U[]> {
        const maxThreads = params?.maxThreads ?? 100;

        let resultArr: U[] = Array.from({ length: this.length });
        let pool = new Set<Promise<any>>();

        await new Promise(finish => {
            let i = 0;
            let finishedTasks = 0;

            const fillPool = () => {
                while(pool.size < maxThreads && i < this.length) {
                    let curIndex = i;
                    i++;

                    const promise = new Promise(async resolve => {
                        const result = await callback.call(thisArg, this[curIndex], curIndex, this);

                        resultArr[curIndex] = result;
                        pool.delete(promise);
                        finishedTasks++;

                        if (finishedTasks >= this.length) finish(undefined);
                        
                        resolve(result);
                    }).then(() => fillPool());

                    pool.add(promise);
                }
            };

            fillPool();
        });

        return resultArr;
    }
}
