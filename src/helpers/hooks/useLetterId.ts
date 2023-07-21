import { useMemo } from 'react';

export default function useLetterId() {
    return useMemo(() => {
        return Array.from(
            {
                length: 8,
            },
            () => {
                return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
            }
        ).join('');
    }, []);
}
