import HomeNavbar from '@/components/hypePage/navbar';
import Footer from '@/components/specific/marketplace/footer';

import Background from '@/components/hypePage/background/background';
import Features from '@/components/hypePage/features/features';
import Hero from '@/components/hypePage/hero/hero';
import Roadmap from '@/components/hypePage/roadmap';

import classes from './styles.module.css';

export default function HomePage() {
    return (
        <>
            <div className={ classes.mainHypepageContainer }>
                <div className={ classes.mainHypepageWrapper }>
                    <HomeNavbar />

                    <Hero />
                    <Features />

                    <Roadmap />

                    <Background />

                    <Footer />
                </div>
            </div>
        </>
    );
}
