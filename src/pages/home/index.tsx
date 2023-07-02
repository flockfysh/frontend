import Background from '@/components/hypePage/background/background';
import Features from '../../components/hypePage/features/features';
import Hero from '../../components/hypePage/hero/hero';
import Roadmap from '../../components/hypePage/roadmap';
import classes from './styles.module.css';

export default function HypePage() {
    return (
        <div className={ classes.mainHypepageContainer }>
            <div className={ classes.mainHypepageWrapper }>
            <Hero />
            <Features />
            
            <Roadmap />

            <Background />
            </div>
        </div>
    );
}
