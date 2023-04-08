import bgRoadmapDesktop1 from '../../images/bg-roadmap-desktop-1.png';
import bgRoadmapDesktop2 from '../../images/bg-roadmap-desktop-2.png';
import bgRoadmapDesktop3 from '../../images/bg-roadmap-desktop-3.png';
import bgRoadmapDesktop4 from '../../images/bg-roadmap-desktop-4.png';
import bgRoadmapDesktop5 from '../../images/bg-roadmap-desktop-5.png';
import bgRoadmapDesktop6 from '../../images/bg-roadmap-desktop-6.png';
import bgRoadmapDesktop7 from '../../images/bg-roadmap-desktop-7.png';
import bgRoadmapMobile1 from '../../images/bg-roadmap-mobile-1.png';
import bgRoadmapMobile2 from '../../images/bg-roadmap-mobile-2.png';
import bgRoadmapMobile3 from '../../images/bg-roadmap-mobile-3.png';

import classes from './background.module.css';

export default function RoadmapBackground() {
   return (
        <div className={ classes.backgroundWrapper }>
            <img className={ `${classes.bgRoadmapDesktop} ${classes.bgRoadmapDesktop1}` } src={ bgRoadmapDesktop1 } alt="" loading="lazy" />
            <img className={ `${classes.bgRoadmapDesktop} ${classes.bgRoadmapDesktop2}` } src={ bgRoadmapDesktop2 } alt="" loading="lazy" />
            <img className={ `${classes.bgRoadmapMobile} ${classes.bgRoadmapMobile1 }` } src={ bgRoadmapMobile1 } alt="" loading="lazy" />
            <img className={ `${classes.bgRoadmapDesktop} ${classes.bgRoadmapDesktop3}` } src={ bgRoadmapDesktop3 } alt="" loading="lazy" />
            <img className={ `${classes.bgRoadmapDesktop} ${classes.bgRoadmapDesktop4}` } src={ bgRoadmapDesktop4 } alt="" loading="lazy" />
            <img className={ `${classes.bgRoadmapDesktop} ${classes.bgRoadmapDesktop5}` } src={ bgRoadmapDesktop5 } alt="" loading="lazy" />
            <img className={ `${classes.bgRoadmapMobile} ${classes.bgRoadmapMobile2 }` } src={ bgRoadmapMobile2 } alt="" loading="lazy" />
            <img className={ `${classes.bgRoadmapDesktop} ${classes.bgRoadmapDesktop6}` } src={ bgRoadmapDesktop6 } alt="" loading="lazy" />
            <img className={ `${classes.bgRoadmapDesktop} ${classes.bgRoadmapDesktop7}` } src={ bgRoadmapDesktop7 } alt="" loading="lazy" />
            <img className={ `${classes.bgRoadmapMobile} ${classes.bgRoadmapMobile3 }` } src={ bgRoadmapMobile3 } alt="" loading="lazy" />
        </div>
    );
}
