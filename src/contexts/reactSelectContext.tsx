import { PropsWithChildren, useState, useEffect } from 'react';

import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

/**
 * React-CreatableSelect will load its styling after all CSS modules, which causes low-specificity styles to not function.
 * This component forces all Emotion styles, which is used by React CreatableSelect, to the top of the head element,
 * before the title element, therefore allowing styles in CSS modules to be used.
 * Component to be invoked in App.tsx.
 *
 * Check https://react-select.com/styles documentation for more details.
 *
 * @param props Children to wrap around.
 * @constructor
 */
export function EmotionCacheProvider(props: PropsWithChildren) {
    const [cache, setCache] = useState<EmotionCache>(() => {
        return createCache({
            key: 'css-module',
        });
    });

    useEffect(() => {
        setCache(
            createCache({
                key: 'css-module',
                insertionPoint: document.querySelector('title')!,
            })
        );
    }, []);

    return cache ? (
        <CacheProvider value={ cache }>{ props.children }</CacheProvider>
    ) : (
        <>{ props.children }</>
    );
}
