import React from 'react';
import FocusedDataset from '@/components/specific/marketplace/focusedDataset';
import classes from './styles.module.css';
import DatasetSwiper from '@/components/specific/marketplace/datasetSwiper';
import datasets from '@/pages/datasets';


function useForceUpdate() {
    const [value, setValue] = React.useState(0);
    return () => setValue(value => value + 1);
}

export default function FeaturedDatasetsSection(props: {
    datasets: HomepageDataset[]
}) {
    const [curDataset, setCurDataset] = React.useState(props.datasets[0]);

    return (
        <section className={ classes.headerContainer }>
            <FocusedDataset { ...curDataset }></FocusedDataset>
            <DatasetSwiper centeredSlides={ true } cardType={ 'wide' } datasets={ props.datasets }
                           onSlideChange={ dataset => setCurDataset(dataset) }></DatasetSwiper>
        </section>
    );
}
