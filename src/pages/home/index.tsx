import Background from '@/components/hypePage/background/background';
import Features from '../../components/hypePage/features/features';
import Hero from '../../components/hypePage/hero/hero';
import Roadmap from '../../components/hypePage/roadmap';
import classes from './styles.module.css';
import HomeLayout from '@/components/layout/homeLayout';

function HomePage() {
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

/*
//Uncomment this to when we figure out how to set up the navbar context
HomePage.getLayout = function (page) {
    return <HomeLayout>{ page }</HomeLayout>;
};
*/

export default HomePage
