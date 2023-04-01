import bgDesktop1 from '../../../images/BGDesktop1.png';
import bgDesktop2 from '../../../images/BGDesktop2.png';
import bgMobile1 from '../../../images/BGMobile1.png';
import bgMobile2 from '../../../images/BGMobile2.png';

import classes from './background.module.css';

export default function Background() {
   return (
        <div className={ classes.backgroundWrapper }>
            <img className={ classes.bgDesktop1 } src={ bgDesktop1 } alt="" />
            <img className={ classes.bgDesktop2 } src={ bgDesktop2 } alt="" />
            <img className={ classes.bgMobile1 } src={ bgMobile1 } alt="" />
            <img className={ classes.bgMobile2 } src={ bgMobile2 } alt="" />
        </div>
    );
}
