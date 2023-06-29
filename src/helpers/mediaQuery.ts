import { useMemo, useState, useEffect } from 'react';

export function useMediaQuery(mediaQuery: string) {
    const query = useMemo(() => {
        return window.matchMedia(mediaQuery);
    }, [mediaQuery]);

    const [match, setMatch] = useState(() => {
        return query.matches;
    });

    useEffect(() => {
        function resize() {
            setMatch(query.matches);
        }

        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [match, query]);

    return match;
}
