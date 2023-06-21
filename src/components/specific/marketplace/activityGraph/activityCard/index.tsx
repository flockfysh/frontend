import dayjs from 'dayjs';

import { formatFileSize } from '@/helpers/formatting';

import classes from './styles.module.css';

function formatActivityToDescription(activity: UserActivity | DatasetActivity) {
    if('dataset' in activity) return <p>{ activity.action.toUpperCase() } { activity.numFiles } { activity.type }s to <span className={ classes.bolded }>{ activity.dataset }</span> totalling { formatFileSize(activity.size) }</p>;
    else return <p>User <span className={ classes.bolded }>{ activity.userName }</span> { activity.action } { activity.numFiles } { activity.type }s totalling { formatFileSize(activity.size) }</p>;
}

export default function ActivityCard(props: { activity: UserActivity | DatasetActivity }) {
    return (
        <div className={ classes.container }>
            <div className={ classes.progressLineContainer }>
                <span className={ classes.progressCircle }></span>
                <span className={ classes.progressLine }></span>
            </div>

            <div className={ classes.rightSideContainer }>
                {
                    (function() {
                        const d1 = dayjs(props.activity.date);
                        const d2 = dayjs(new Date());

                        const diffY = d2.diff(d1, 'year');
                        if(diffY > 0) return `${ diffY } years ago`;

                        const diffM = d2.diff(d1, 'month');
                        if(diffM > 0) return `${ diffM } months ago`;
                        
                        const diffD = d2.diff(d1, 'day');
                        if(diffD > 0) return `${ diffD } days ago`;

                        const diffH = d2.diff(d1, 'hour');
                        if(diffH > 0) return `${ diffH } hours ago`;

                        const diffMi = d2.diff(d1, 'minute');
                        if(diffMi > 0) return `${ diffMi } minutes ago`;

                        return 'Just now';
                    })()
                }

                { formatActivityToDescription(props.activity) }
            </div>
        </div>
    );
}
