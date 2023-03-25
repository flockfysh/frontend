import FillableSVG from '../../../UI/image/fillableSVG/fillableSVG';

import classes from '../common.module.css';
import progressScreenClasses from './progressScreen.module.css';
import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import RelativeTime from 'dayjs/plugin/relativeTime';
import loadingIcon from '../../../../images/icons/loading.svg';
import LoadingIcon from '../../../UI/loadingIcon/loadingIcon';

export interface ProgressScreenProps {
    current: number;
    total: number;
    description: string;
    eta?: number;
}

dayjs.extend(Duration);
dayjs.extend(RelativeTime);


function ProgressBar(props: { current: number, total: number }) {
    return (
        <>
            <progress max={ props.total } value={ props.current }
                      className={ progressScreenClasses.progressBarAccessibility }></progress>
            <div className={ progressScreenClasses.progressBarOuter }>
                <div className={ progressScreenClasses.progressBarInner } style={ {
                    width: `${props.current / props.total * 100}%`,
                } }></div>
            </div>
        </>
    );
}

export default function ProgressScreen(props: ProgressScreenProps) {
    let progressBarETA;
    if (typeof props.eta === 'number') {
        const secondsLeft = +props.eta.toFixed(2);
        const formatted = dayjs.duration({ seconds: secondsLeft }).humanize();
        progressBarETA = (
            <p>
                Estimated time remaining: {formatted}
            </p>
        );
    }

    return (
        <>
            <div className={ classes.container }>
                <div className={ classes.progressContainer }>
                    <LoadingIcon></LoadingIcon>
                    <ProgressBar current={ props.current } total={ props.total }></ProgressBar>
                    <p>{props.description}</p>
                    {progressBarETA}
                </div>
            </div>

        </>
    );
}
