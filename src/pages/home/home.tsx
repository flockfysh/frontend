import {useContext} from 'react';

import Hero from '../../components/homePage/hero/hero';
import Features from '../../components/homePage/features/features';
import Reviews from '../../components/homePage/reviews/reviews';
import UserSignup from '../../components/homePage/userSignup/userSignup';
import CoreBelief from '../../components/homePage/coreBelief/coreBelief';

import {ScreenContext} from '../../contexts/screenContext';

export default function HomePage() {
    const {windowTooSmall} = useContext(ScreenContext);

    return (
        <>
            <Hero/>
            <Features/>
            <CoreBelief/>

            {windowTooSmall ? <></> : <Reviews/>}

            <UserSignup/>
        </>
    );
}
