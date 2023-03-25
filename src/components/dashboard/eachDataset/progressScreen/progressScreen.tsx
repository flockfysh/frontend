import classes from '../common.module.css';
import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import RelativeTime from 'dayjs/plugin/relativeTime';

export interface ProgressScreenProps {
    current: number;
    total: number;
    description: string;
    eta?: number;
}

dayjs.extend(Duration);
dayjs.extend(RelativeTime);

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
                    <progress max={ props.total } value={ props.current }
                              className={ classes.progressBar }></progress>
                    <p>{props.description}</p>
                    {progressBarETA}
                </div>
            </div>

        </>
    );
}
