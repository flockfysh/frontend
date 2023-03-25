import classes from './sectionOne.module.css';
import Card from '../card/card';
import icon1 from '.././icons/icon1.svg';
import icon2 from '.././icons/icon2.svg';
import icon3 from '.././icons/icon3.svg';
import icon4 from '.././icons/icon4.svg';
import stage1 from '../images/stage1.svg';
import mainImage from '../images/firstSectionImage.svg';

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
        <section>
            <img src={ stage1 } alt="" className={ classes.stage }/>
            <h4 className={ classes.subHeading }>Dive in headfirst</h4>
            <h3 className={ classes.heading }>"No homework necessary"</h3>
            <p className={ classes.body }>
                No matter where you are in the process, whether you have a couple
                pieces, or a large stack of data, our dataset tooling can process and
                expand the data to gear it for a large scale
            </p>
            <div className={ classes.featureSection }>
                <img src={ mainImage } alt="" className={ classes.mainImage }/>
                <div className={ classes.cardHolder }>
                    <Card heading="Minimal Requirements" body={ card1body } icon={ icon1 }/>
                    <Card heading="Cloud Portability" body={ card2body } icon={ icon2 }/>
                    <Card heading="Local flexibility" body={ card3body } icon={ icon3 }/>
                    <Card heading="Broad applicability" body={ card4body } icon={ icon4 }/>
                </div>
            </div>
        </section>
    );
}

export default SectionOne;
