import { useCallback, useState } from 'react';

export default function useForceUpdate() {
    const [_, setValue] = useState(0);
    return useCallback(() => setValue((value) => value + 1), []);
}
