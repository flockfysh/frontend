import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DatasetCard from '../../components/dashboard/viewDatasets/datasetCard/datasetCard';
import Loading from '../../components/loading/loading';

import MiniProfile from '../../components/dashboard/viewDatasets/miniProfile/miniProfile';

import GradientLink from '../../components/UI/gradientLink/gradientLink';
import SearchInput from '../../components/UI/input/searchInput';

import classes from './viewDatasets.module.css';
import api from '../../helpers/api';

export default function ViewDatasets() {
    const [datasets, updateDatasets] = useState<PartialDataset[]>([]);
    const [isLoading, updateLoadingState] = useState(true);
    const [filter, updateFilter] = useState('');

    useEffect(() => {
        updateLoadingState(true);

        (async function () {
            const datasets = (await api.get('/api/dataset')).data.data as PartialDataset[];
            console.log(datasets);
            updateDatasets(datasets);
            updateLoadingState(false);
        })();
    }, []);

    if (isLoading) return <Loading/>;

    return (
        <div className={classes.viewDatasetsContainer}>
            <header className={classes.header}>
                <MiniProfile/>
                <div className={classes.searchDatasets}>
                    <SearchInput
                        type={'text'}
                        placeholder={'Find your dataset...'}
                        onChange={e => updateFilter(e.target.value)}
                        onLookup={data => updateFilter(data)}
                        containerClassName={classes.searchInputContainer}
                    ></SearchInput>
                    <GradientLink
                        hasArrow={true}
                        gradientDirection="leftToRight"
                        children="Create a new dataset"
                        to="/dashboard/create-dataset"
                        className={classes.createDatasetButton}
                    />
                </div>
            </header>

            <h1 className={classes.viewDatasetsHeader}>Your Datasets</h1>

            <ul className={classes.datasetsContainer}>
                {
                    (function generateFilterElements() {
                        const elements =
                            filter.length === 0
                                ? datasets
                                : datasets.filter(d =>
                                    d.name
                                        .toLowerCase()
                                        .includes(
                                            filter
                                                .replaceAll(' ', '')
                                                .toLowerCase()
                                        )
                                );

                        if (elements.length === 0)
                            return (
                                <h2 className={classes.noDatasetsFound}>
                                    Sorry, no datasets found. Go {' '}
                                    <Link to="/dashboard/create-dataset">here</Link> {' '}
                                    to create one.
                                </h2>
                            );
                        else
                            return elements.map(
                                (dataset, index) => (
                                    <DatasetCard key={index} dataset={dataset}/>
                                )
                            );
                    })()
                }
            </ul>
        </div>
    );
}
