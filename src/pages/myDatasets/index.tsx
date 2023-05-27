import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/components/layout/MainLayout';
import classes from './styles.module.css';
import { ReactSVG } from 'react-svg';
import search from '@/icons/main/search.svg';
import sliders from '@/icons/main/sliders.svg';
import dayjs from 'dayjs';
import DatasetCard from '@/components/specific/datasets/myDatasets/DatasetCard';
import { v4 } from 'uuid';

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
    return (
        <>
            <header className={ classes.header }>
                <label className={ classes.searchBarContainer }>
                    <ReactSVG src={ search.src } className={ classes.searchBarIcon }></ReactSVG>
                    <input type={ 'search' } className={ classes.searchBarInput } placeholder={ 'Search' }/>
                    <button className={ classes.searchFilterButton }>
                        <ReactSVG src={ sliders.src } className={ classes.searchFilterIcon }></ReactSVG>
                    </button>
                </label>
                <button className={ classes.newDatasetButton }>New Dataset</button>
            </header>
            <div className={ classes.mainContent }>
                <ul className={ classes.datasetGrid }>
                    {TEST_DATASETS.map(dataset => <DatasetCard key={ dataset.id } { ...dataset }></DatasetCard>)}
                </ul>
            </div>
        </>
    );
};

MyDatasets.getLayout = function (page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    );
};

export default MyDatasets;
