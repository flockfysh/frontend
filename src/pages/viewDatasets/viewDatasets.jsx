import { useEffect, useState } from 'react';

import DatasetCard from '../../components/dashboard/viewDatasets/datasetCard/datasetCard';
import Loading from '../../components/loading/loading';

import MiniProfile from '../../components/dashboard/viewDatasets/miniProfile/miniProfile';

import Button from '../../components/UI/button/button';

import Image from '../../images/heroImage.jpg';
import Icon from '../../images/icons/search.svg';

import classes from './viewDatasets.module.css';

export default function ViewDatasets() {
    const [datasets, updateDatasets] = useState(null);
    const [isLoading, updateLoadingState] = useState(true);
    const [filter, updateFilter] = useState('');

    useEffect(() => {
        updateLoadingState(true);

        (async function() {
            // fetch user datasets here
            let testDatasets = [];

            for(let i = 0; i < 6; i++) {
                testDatasets.push(
                    {
                        name: 'Dogs',
                        id: 'ID',
                        numImages: 10,
                        overview: 'Lorem ipsum dolor sit amet, consectetur sed do eiusmod adipiscing elit, sed do eiusmod  ut aliquip ex ea sed do eiusmod commodo consequat.'
                    }
                )
            }
    
            updateDatasets(testDatasets);

            updateLoadingState(false);
        })();
    }, []);

    if(isLoading) return <Loading />;

    return (
        <div className={ classes.viewDatasetsContainer }>
            <header className={ classes.header }>
                <MiniProfile name="Ray" email="ray@gmail.com" image={ Image } />

                <div className={ classes.searchWrapper }>
                   <div className={ classes.container }>
                      <input type="text" placeholder="Find your dataset..." onChange={ (e) => updateFilter(e.target.value) }/>
                      
                      <img src={ Icon } alt="" />
                   </div>
                </div>

                <div className={ classes.btnWrapper }>
                   <Button
                      hasArrow={true}
                      gradientDirection="leftToRight"
                      text="Create new dataset"
                      link="/dashboard/create-dataset"
                   />
                </div>
            </header>

            <h1 className={ classes.viewDatasetsHeader }>Your Datasets</h1>

            <div className={ classes.datasetsContainer }>
                { 
                    (
                        filter.length > 0 ? 
                            datasets.filter(
                                d => d.name.toLowerCase().includes(filter.replaceAll(' ', '').toLowerCase())
                            ) 
                        : datasets
                    ).map(
                        (dataset, index) => <DatasetCard key={ index } dataset={ dataset } />
                    ) 
                }
            </div>
        </div>
    );
}