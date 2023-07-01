import classes from './sectionThree.module.css';
import threeFish from '.././images/threeFish.svg';
import icon9 from '../../../icons/hype/icon9.svg';
import icon10 from '../../../icons/hype/icon10.svg';
import icon11 from '../../../icons/hype/icon11.svg';
import mainImage from '.././images/thirdSectionImage.svg';
import SectionHeader from './components/sectionHeader';
import Card from '../../UI/card';

function SectionThree() {
    const card1body =
        'Rapidly train, explore models, and conduct customizable experiments through Python or the command line.';
    const card2body =
        'Connect flockfysh datasets into any MLOps workflow with our flexibile compatibility.';
    const card3body = 'Have any questions answered rapidly by our support team.';

    return (
        <div>
            <div className={ classes.numberDiv }>
                <img src={ threeFish } alt="" className={ classes.fish }/>
                <h3 className={ classes.number }>3</h3>
            </div>
            <SectionHeader
                subHeader="Harness the power of the sea."
                header='"Teleport your datasets into your workflows without a hitch"'
                body="Through support, lightning fast integrations and deployments, continue challenging the boundaries without skipping a beat."
            />
            <div className={ classes.cardDiv }>
                <img className={ classes.cardImage } src={ mainImage } alt=""/>
                <Card heading="flockfysh CLI" body={ card1body } icon={ icon9 }/>
                <Card heading="Rapid Deployment" body={ card2body } icon={ icon10 }/>
                <Card heading="24/7 Support " body={ card3body } icon={ icon11 }/>
            </div>
        </div>
    );
}

export default SectionThree;
