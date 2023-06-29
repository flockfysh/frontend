import { useState } from 'react';

import FocusedDataset from '@/components/specific/marketplace/focusedDataset';
import DatasetSwiper from '@/components/specific/marketplace/datasetSwiper';

import classes from './styles.module.css';

export default function FeaturedDatasetsSection(props: {
    datasets: HomepageDataset[]
}) {
    const [curDataset, setCurDataset] = useState(props.datasets[0]);

    return (
        <section className={ classes.headerContainer }>
            <FocusedDataset { ...curDataset } />

            <DatasetSwiper
                centeredSlides={ true }
                cardType="wide"
                datasets={ props.datasets }
                onSlideChange={ dataset => setCurDataset(dataset) }
            />
        </section>
    );
}
