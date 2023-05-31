import { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactSVG } from 'react-svg';

import { v4 } from 'uuid';
import dayjs from 'dayjs';

import MainLayout from '@/components/layout/MainLayout';
import DatasetCard from '@/components/specific/datasets/myDatasets/DatasetCard';
import CreateDatasetModal from '@/components/specific/datasets/createDatasetModal';

import search from '@/icons/main/search.svg';
import sliders from '@/icons/main/sliders.svg';

import classes from './styles.module.css';

const TEST_DATASETS: Dataset[] = Array.from({ length: 25 }, () => {
    return {
        name: 'Dogs',
        description: 'This is a datset of dogs.',
        createdAt: dayjs().subtract(15, 'minute').toDate(),
        tags: ['Dogs', 'Segmentation'],
        numAssets: 30,
        id: v4(),
        stage: 'feedback',
        entityInfo: {
            completedItemCount: 0,
            itemCount: 30,
            size: 20423450,
            feedbackItemCount: 5,
            uploadedItemCount: 25,
        },
        subTags: [],
        numTimesHumanFeedback: 0,
    };
});


const MyDatasets: NextPageWithLayout = function () {
    const [createDataset, updateCreateDataset] = useState(false);

    return (
        <>
            { createDataset && <CreateDatasetModal onClose={ () => updateCreateDataset(false) } /> }
            
            <header className={ classes.header }>
                <label className={ classes.searchBarContainer }>
                    <ReactSVG src={ search.src } className={ classes.searchBarIcon } />
                    
                    <input type="search" className={ classes.searchBarInput } placeholder="Search" />

                    <button className={ classes.searchFilterButton }>
                        <ReactSVG src={ sliders.src } className={ classes.searchFilterIcon } />
                    </button>
                </label>

                <button className={ classes.newDatasetButton } onClick={ () => updateCreateDataset(true) }>New Dataset</button>
            </header>

            <div className={ classes.mainContent }>
                <ul className={ classes.datasetGrid }>
                    { TEST_DATASETS.map(dataset => <DatasetCard key={ dataset.id } { ...dataset } />) }
                </ul>
            </div>
        </>
    );
};

MyDatasets.getLayout = function (page) {
    return (
        <MainLayout>
            { page }
        </MainLayout>
    );
};

export default MyDatasets;
