import { useState } from 'react';
import DatasetTimeFilter from '../datasetTimeFilter';
import Graph from './graph';
// import ActivityCard from './activityCard';
// import ActivityTable from '@/components/specific/marketplace/activityGraph/activityTable';

import classes from './styles.module.css';

export default function ActivityGraph(dataset: PreviewDataset) {
    // 0 = 1 week, 1 = 1 month, 2 = 6 months, 3 = 1 year
    const [selectedTime, updateSelectedTime] = useState(2);

    return (
        <div className={ classes.container }>
            <div className={ classes.headerContainer }>
                <div className={ classes.topHeaderContainer }>
                    <h1 className={ classes.header }>Latest Activity</h1>

                    <DatasetTimeFilter
                        callback={ (time) => updateSelectedTime(time) }
                        options={ [
                            [7, 'days'],
                            [1, 'month'],
                            [6, 'months'],
                            [1, 'year'],
                        ] }
                        selected={ selectedTime }
                    />
                </div>

                <div className={ classes.headerContent }>
                    { /*<div className={ classes.activityTimeline }>*/ }
                    { /*    {*/ }
                    { /*        activity.map((activity, i) => (*/ }
                    { /*            <ActivityCard*/ }
                    { /*                key={ i }*/ }
                    { /*                activity={ activity }*/ }
                    { /*            />*/ }
                    { /*        ))*/ }
                    { /*    }*/ }
                    { /*</div>*/ }

                    <div className={ classes.chartContainer }>
                        <Graph { ...dataset } />
                    </div>
                </div>
            </div>

            { /*<div className={ classes.history }>*/ }
            { /*    <h1 className={ classes.header }>Activity History</h1>*/ }

            { /*    <div className={ classes.activityTableContainer }>*/ }
            { /*        <ActivityTable />*/ }
            { /*    </div>*/ }
            { /*</div>*/ }
        </div>
    );
}
