import commonClasses from './common.module.css';
import classes from './sectionTwo.module.css';

import rapidExperimentationIcon from '.././images/rapidExperimentation.svg';
import lightningFastIcon from '.././images/lightningFast.svg';
import absoluteControlIcon from '.././images/absoluteControl.svg';
import minimalHumanEffortIcon from '.././images/minimalHumanEffort.svg';
import secondSectionImage from '.././images/secondSectionImage.svg';
import twoFish from '.././images/twoFish.svg';
import aboveImage from '.././images/aboveImageSecondSection.svg';
import belowImage from '.././images/belowImageSecondSection.svg';

import Card from '../../ui/card';
import SectionHeader from './components/sectionHeader';

const cardsInfo = [
    {
        name: 'rapid-experimentation',
        title: 'Rapid Experimentation',
        description:
            'Quickly test many datasets to leverage transfer learning and custom pre-training.',
        icon: rapidExperimentationIcon.src,
    },
    {
        name: 'lightning-fast',
        title: 'Lightning Fast',
        description:
            'Initiate flockfysh and get large-scale datasets in a few days.',
        icon: lightningFastIcon.src,
    },
    {
        name: 'absolute-control',
        title: 'Absolute Control',
        description:
            'Make real-time corrections to your datasets. We\'ll regularly send you samples throughout the process. ',
        icon: absoluteControlIcon.src,
    },
    {
        name: 'minimal-human-effort',
        title: 'Minimal Human Effort',
        description:
            'Provide 5 minutes of your time for a fully annotated, large-scale dataset. Countless hours of manual labeling is now obsolete.',
        icon: minimalHumanEffortIcon.src,
    },
];

function SectionTwo() {
    return (
        <section
            className={ `${commonClasses.section} ${classes.sectionTwoContainer}` }
        >
            <div className={ classes.numberDiv }>
                <img src={ twoFish.src } alt="" className={ classes.fish } />
                <h3 className={ classes.number }>2</h3>
            </div>

            <SectionHeader
                subHeader="Explore the depths of the ocean."
                header="Imagine and Iterate"
                body="Efficiently unlock the true potential of the data you brought."
            />

            <div className={ classes.container }>
                <div className={ classes.middleImageContainer }>
                    <div className={ classes.middleImagewrapper }>
                        <img src={ secondSectionImage.src } alt="" />
                    </div>
                </div>

                <div className={ classes.aboveImageContainer }>
                    <img src={ aboveImage.src } alt="" />
                </div>

                <div className={ classes.infoContainer }>
                    { cardsInfo.map((item, i) => (
                        <div
                            key={ i }
                            className={ `${classes['anchor' + i]} ${
                                classes.anchor
                            }` }
                        >
                            <Card
                                className={ `${classes['card' + i]} ${
                                    classes.card
                                }` }
                                heading={ item.title }
                                body={ item.description }
                                icon={ item.icon }
                            />
                        </div>
                    )) }
                </div>

                <div className={ classes.belowImageContainer }>
                    <img src={ belowImage.src } alt="" />
                </div>
            </div>
        </section>
    );
}

export default SectionTwo;
