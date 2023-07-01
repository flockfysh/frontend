import Card from '../../UI/card';
import icon1 from '../../../icons/hype/icon1.svg';
import icon2 from '../../../icons/hype/icon2.svg';
import icon3 from '../../../icons/hype/icon3.svg';
import icon4 from '../../../icons/hype/icon4.svg';
import oneFish from '../images/oneFish.svg';
import mainImage from '../images/firstSectionImage.svg';
import mobileImage1 from '../images/firstSectionMobile1.svg';
import mobileImage2 from '../images/firstSectionMobile2.svg';
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
                <img src={ oneFish.src } alt="" className={ classes.fish }/>
                <h3 className={ classes.number }>1</h3>
            </div>
            <SectionHeader
                subHeader="Dive in headfirst"
                header='"No homework necessary"'
                body="No matter where you are in the process, whether you have a couple pieces, or a large stack of data, our dataset tooling can process and expand the data to gear it for a large scale"
            />
            <div className={ classes.cards }>
                <img src={ mainImage.src } alt="" className={ classes.mainImage }/>
                <img src={ mobileImage1.src } alt="" className={ classes.mobileImage }/>
                <div className={ classes.cardHolder }>
                    <Card heading="Minimal Requirements" body={ card1body } icon={ icon1.src } className={ classes.card }/>
                    <Card heading="Cloud Portability" body={ card2body } icon={ icon2.src } className={ classes.card }/>
                    <Card heading="Local flexibility" body={ card3body } icon={ icon3.src } className={ classes.card }/>
                    <Card heading="Broad applicability" body={ card4body } icon={ icon4.src } className={ classes.card }/>
                </div>
                <img src={ mobileImage2.src } alt="" className={ classes.mobileImage }/>

            </div>
        </section>
    );
}

export default SectionOne;
