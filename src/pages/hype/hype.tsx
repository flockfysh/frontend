// import { useContext } from 'react';

import Background from '../../components/hypePage/background/background';
import Features from '../../components/hypePage/features/features';
import Hero from '../../components/hypePage/hero/hero';

// import { ScreenContext } from '../../contexts/screenContext';

export default function HypePage() {
    // const { windowTooSmall } = useContext(ScreenContext);

    return (
        <>
            <Hero />
            <Features />
            {/* { windowTooSmall ? <></> : <Reviews /> } */}
            <Background />
        </>
    );
}
