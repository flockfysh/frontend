import classes from './sectionTwo.module.css';
import rapidExperimentationIcon from '.././Images/rapidExperimentation.svg';
import lightningFastIcon from '.././Images/lightningFast.svg';
import absoluteControlIcon from '.././Images/absoluteControl.svg';
import minimalHumanEffortIcon from '.././Images/minimalHumanEffort.svg';
import secondSectionImage from '.././Images/secondSectionImage.svg';
import twoFish from '.././Images/twoFish.svg';
import aboveImage from '.././Images/aboveImageSecondSection.svg';
import belowImage from '.././Images/belowImageSecondSection.svg';
import Card from '../../card';
import SectionHeader from './components/sectionHeader';

const cardsInfo = [
    {
        name: 'rapid-experimentation',
        title: 'Rapid Experimentation',
        description: 'Quickly test many datasets to leverage transfer learning and custom pre-training.',
        icon: rapidExperimentationIcon,
    },
    {
        name: 'lightning-fast',
        title: 'Lightning Fast',
        description: 'Initiate flockfysh and get large-scale datasets in a few days.',
        icon: lightningFastIcon,
    },
    {
        name: 'absolute-control',
        title: 'Absolute Control',
        description: 'Make real-time corrections to your datasets. We\'ll regularly send you samples throughout the process. ',
        icon: absoluteControlIcon,
    },
    {
        name: 'minimal-human-effort',
        title: 'Minimal Human Effort',
        description: 'Provide 5 minutes of your time for a fully annotated, large-scale dataset. Countless hours of manual labeling is now obsolete.',
        icon: minimalHumanEffortIcon,
    },
];

function SectionTwo() {
    return (
        <div className={ classes.sectionTwoContainer }>
            <div className={ classes.numberDiv }>
                <img src={ twoFish } alt="" className={ classes.fish } />
                <h3 className={ classes.number }>2</h3>
            </div>

            <SectionHeader
                subHeader="Explore the depths of the ocean."
                header="Imagine and Iterate"
                body="Efficiently unlock the true potential of the data you brought."
            />

            <div className={ classes.middleImageContainer }>
                <div className={ classes.middleImagewrapper }>
                    <img src={ secondSectionImage } alt="" />
                </div>
            </div>

            <div className={ classes.aboveImageContainer }>
                <img src={ aboveImage } alt="" />
            </div>

            <div className={ classes.infoContainer }>
                {
                    cardsInfo.map(item => (
                        <Card heading={ item.title } body={ item.description } icon={ item.icon } />
                    ))
                }
            </div>

            <div className={ classes.belowImageContainer }>
                <img src={ belowImage } alt="" />
            </div>
        </div>
    );
}

export default SectionTwo;
