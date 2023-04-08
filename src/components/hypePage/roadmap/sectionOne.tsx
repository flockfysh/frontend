import Card from '../../UI/card';
import icon1 from '.././icons/icon1.svg';
import icon2 from '.././icons/icon2.svg';
import icon3 from '.././icons/icon3.svg';
import icon4 from '.././icons/icon4.svg';
import oneFish from '.././images/oneFish.svg';
import mainImage from '.././images/firstSectionImage.svg';
import SectionHeader from './components/sectionHeader';

import classes from './sectionOne.module.css';
import commonClasses from './common.module.css';

const card1body =
    'Build top-notch, labeled large scale datasets whether you have 50 or 50,000 data samples.';
const card2body =
    'Seamlessly connect our services with your favorite data storage platforms such as AWS and Azure.';
const card3body =
    'Use the flockfysh CLI to access, check status, and steer the dataset building process—all in real time.';
const card4body =
    'Build datasets for all SOTA Computer Vision problems and in the future, NLP problems too.';

function SectionOne() {
    return (
        <section className={ commonClasses.section } id="roadmap">
            <div className={ classes.numberDiv }>
                <img src={ oneFish } alt="" className={ classes.fish }/>
                <h3 className={ classes.number }>1</h3>
            </div>
            <SectionHeader
                subHeader="Dive in headfirst"
                header='"No homework necessary"'
                body="No matter where you are in the process, whether you have a couple pieces, or a large stack of data, our dataset tooling can process and expand the data to gear it for a large scale"
            />
            <div className={ classes.cards }>
                <img src={ mainImage } alt="" className={ classes.mainImage }/>

                <div className={ classes.cardHolder }>
                    <Card heading="Minimal Requirements" body={ card1body } icon={ icon1 } className={ classes.card }/>
                    <Card heading="Cloud Portability" body={ card2body } icon={ icon2 } className={ classes.card }/>
                    <Card heading="Local flexibility" body={ card3body } icon={ icon3 } className={ classes.card }/>
                    <Card heading="Broad applicability" body={ card4body } icon={ icon4 } className={ classes.card }/>
                </div>
            </div>
        </section>
    );
}

export default SectionOne;
