import React, {PropsWithChildren} from "react";
import createCache from "@emotion/cache";
import {CacheProvider} from "@emotion/react";

export default function EmotionCacheProvider(props: PropsWithChildren) {
    const cache = React.useMemo(() => {
        return createCache({
            key: "css-module",
            insertionPoint: document.querySelector("title")!,
        });
    }, []);

    return <CacheProvider value={cache}>
        {props.children}
    </CacheProvider>;
}