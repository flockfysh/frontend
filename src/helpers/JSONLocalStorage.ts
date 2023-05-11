class JSONLocalStorage {
    localStorage = localStorage;

    get<T>(item: string): T | null {
        const result = this.localStorage.getItem(item);
        if (result === null) {
            return null;
        }
        return JSON.parse(result) as T;
    }

    getDefault<T>(item: string, defaultValue: T): T {
        const result = this.localStorage.getItem(item);
        if (result === null) {
            this.localStorage.setItem(item, JSON.stringify(defaultValue));
            return defaultValue;
        }
        return JSON.parse(result) as T;
    }

    set<T>(item: string, value: T): void {
        this.localStorage.setItem(item, JSON.stringify(value));
    }
}

const jsonLocalStorage = new JSONLocalStorage();

export default jsonLocalStorage;
