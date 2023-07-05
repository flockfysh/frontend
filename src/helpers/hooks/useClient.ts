import { useEffect, useState } from 'react';

export default function useClient<T>(callback: () => T): T | null {
    const [state, setState] = useState<T | null>(null);

    useEffect(() => {
        setState(callback());
    }, [callback]);

    return state;
}
