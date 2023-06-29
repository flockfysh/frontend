import { useState, useEffect, useContext } from 'react';
import { ReactSVG } from 'react-svg';

import { UserContext } from '@/contexts/userContext';

import VerticalCard from '@/components/specific/marketplace/datasetCards/verticalCard';

import api from '@/helpers/api';

import search from '@/icons/main/search.svg';

import classes from './styles.module.css';

// TODO: update with backend

function DatasetsOwned() {
    const { user } = useContext(UserContext);

    const [datasets, updateDatasets] = useState([] as HomepageDataset[]);

    useEffect(
        () => {
            (async function() {
                const res = await api.get('/api/datasets/search',
                    {
                        params: {
                            public: true,
                            sort: 'metrics.views',
                            expand: 'assetCounts,size,likes,user,thumbnail,url',
                            ascending: false,
                            limit: 8,
                        },
                    }
                );

                updateDatasets(
                    res.data.data
                );
            })();
        }
    , []);

    // 0=all, 1=owned, 2=bought
    const [selectedFilter, updateSelectedFilter] = useState(0);

    return (
        <section className={ classes.mainDiv }>
            <div className={ classes.cardDiv }>
                <div className={ classes.headDiv }>
                    <label className={ classes.searchContainer }>
                        <ReactSVG
                            src={ search.src }
                            className={ classes.searchIcon }
                        />

                        <input
                            onChange={ (event) => {
                                updateDatasets(
                                    datasets.filter((data) =>
                                        data.name
                                            .toLowerCase()
                                            .includes(
                                                event.target.value.toLowerCase()
                                            )
                                    )
                                );
                            } }
                            type="search"
                            className={ classes.search }
                            placeholder="Search datasets"
                        />
                    </label>

                    <ReactSVG
                        src={ search.src }
                        className={ classes.mobileSearch }
                    />

                    <div className={ classes.navDiv }>
                        <div
                            className={ `${ classes.navButton } ${ selectedFilter === 0 && classes.active } ${ classes.firstButton }` }
                            onClick={ () => {
                                    updateDatasets(datasets);

                                    updateSelectedFilter(0);
                                } 
                            }
                        >
                            All
                        </div>

                        <div
                            className={ `${ classes.navButton } ${ selectedFilter === 1 && classes.active }` }
                            onClick={ () => {
                                // updateDatasets(
                                //     datasets.filter(
                                //         (data) => user!.username === data.user.username
                                //     )
                                // );

                                updateSelectedFilter(1);
                            } }
                        >
                            Owned
                        </div>

                        <div
                            className={ `${ classes.navButton } ${ selectedFilter === 2 && classes.active } ${ classes.lastButton }` }
                            onClick={ () => {
                                // setFinalData(
                                //     recievedData.filter(
                                //     (data) => data.owner !== 'praks'
                                //     )
                                // );

                                updateSelectedFilter(2);
                            } }
                        >
                            Bought
                        </div>
                    </div>
                </div>

                { datasets.map((value) => {
                    return (
                        <VerticalCard { ...value } key={ value._id } />
                    );
                }) }
            </div>
        </section>
    );
}

export default DatasetsOwned;
