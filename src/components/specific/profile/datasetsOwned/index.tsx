import { useState } from 'react';
import { ReactSVG } from 'react-svg';

import { v4 } from 'uuid';
import { fakerEN } from '@faker-js/faker';

import VerticalCard from '@/components/specific/marketplace/datasetCards/verticalCard';

import search from '@/icons/main/search.svg';

import classes from './styles.module.css';

// TODO: update with backend

function DatasetsOwned() {
    const recievedData: HomepageDataset[] = Array.from({ length: 8 }, () => ({
        type: 'image',
        likes: 50,
        assetCounts: {
            total: 450,
            byStage: {
                feedback: 0,
                completed: 400,
                uploaded: 50,
            },
            byAnnotationStatus: {
                annotated: 450,
                unannotated: 0,
            },
            byMimetype: {}
        },
        metrics: {
            downloads: 0,
            views: 0,
        },
        size: {
            total: {
                total: Math.random() * 5 * 1024 ** 3,
                cloud: 1024 ** 3,
                cluster: 1024 ** 3,
            },
            byStage: {
                uploaded: 0.5 * 1024 ** 2,
                feedback: 0,
                completed: 4 * 1024 ** 2,
            },
        },
        user: {
            username: 'praks',
            _id: '24159335',
            fullName: 'Prakriti Bista',
            firstName: 'Prakriti',
            email: 'praks@gmail.com',
            lastName: 'Bista',
        },
        createdAt: new Date(),
        _id: v4(),
        name: fakerEN.animal.type(),
        subTags: [],
        tags: [],
        updatedAt: new Date(),
        public: true,
        price: 2.84448,
        description: 'This is a random test dataset',
    }));

    const [finalData, setFinalData] = useState(recievedData);
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
                                setFinalData(
                                    recievedData.filter((data) =>
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
                                    setFinalData(recievedData);

                                    updateSelectedFilter(0);
                                } 
                            }
                        >
                            All
                        </div>

                        <div
                            className={ `${ classes.navButton } ${ selectedFilter === 1 && classes.active }` }
                            onClick={ () => {
                                // setFinalData(
                                //     recievedData.filter(
                                //         (data) => data.owner === 'praks'
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

                { finalData.map((value) => {
                    return (
                        <VerticalCard { ...value } key={ value._id } />
                    );
                }) }
            </div>
        </section>
    );
}

export default DatasetsOwned;
