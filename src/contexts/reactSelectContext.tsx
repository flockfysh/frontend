import { PropsWithChildren, useMemo } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

/**
 * Sets emotion classes for react-select to load later.
 * 
 * @param props 
 * 
 * @returns JSX Element
 */
export function EmotionCacheProvider(props: PropsWithChildren) {
    const cache = useMemo(() => {
        return createCache({
            key: 'css-module',
            insertionPoint: document.querySelector('title')!,
        });
    }, []);

    return (
        <CacheProvider value={ cache }>
            { props.children }
        </CacheProvider>
    );
}
