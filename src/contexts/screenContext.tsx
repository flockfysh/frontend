import React from 'react';
import {MIN_WIDTH} from "../settings";

export function useMediaQuery(callback: (matches: boolean) => void, mediaQuery: string) {
    React.useEffect(() => {
        const curQuery = matchMedia(mediaQuery);
        let lastState = curQuery.matches;
        callback(curQuery.matches);

        function update() {
            if (curQuery.matches !== lastState) {
                lastState = curQuery.matches;
                callback(curQuery.matches);
            }
        }

        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("resize", update);
        };
    }, [mediaQuery]);
}

export const ScreenContext = React.createContext(
    {
        windowTooSmall: false
    }
);

export function ScreenWrapper(props: React.PropsWithChildren) {
    const [windowTooSmall, updateWindowTooSmall] = React.useState(false);

    useMediaQuery((result) => {
        updateWindowTooSmall(!result);
    }, `(min-width: ${MIN_WIDTH}px)`);

    return <ScreenContext.Provider value={{windowTooSmall}}>
        {props.children}
    </ScreenContext.Provider>;
}