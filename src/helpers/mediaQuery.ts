import React from 'react';

export function useMediaQuery(mediaQuery: string) {
    const query = React.useMemo(() => {
        return window.matchMedia(mediaQuery);
    }, [mediaQuery]);

    const [match, setMatch] = React.useState(() => {
        return query.matches;
    });

    React.useEffect(() => {
        function resize() {
            setMatch(query.matches);
        }

        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [match, query]);

    return match;
}
