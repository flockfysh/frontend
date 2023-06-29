import { PropsWithChildren, useState, useEffect, useMemo } from 'react';

import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export function EmotionCacheProvider(props: PropsWithChildren) {
    const cache = useMemo(() => {
        return createCache({
            key: 'css-module',
            prepend: true,
        });
    }, []);
    return <CacheProvider value={ cache }>{ props.children }</CacheProvider>;

}
