import { useState } from 'react';
import { ReactSVG } from 'react-svg';

import VerticalCard from '@/components/specific/marketplace/datasetCards/verticalCard';

import search from '@/icons/main/search.svg';

import classes from './styles.module.css';

function DatasetsOwned() {
    const recievedData = [
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'New Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
        {
            coverImg:
                'https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
            name: 'Dataset Name',
            updatedAt: new Date(),
            owner: 'praks',
            numItems: 12000,
            size: 25,
            type: 'images',
        },
    ];

    const [finalData, setfinalData] = useState(recievedData);

    return (
        <div className={ classes.mainDiv }>
            <div className={ classes.cardDiv }>
                <div className={ classes.headDiv }>
                    <label className={ classes.searchContainer }>
                        <ReactSVG
                            src={ search.src }
                            className={ classes.searchIcon }
                        />

                        <input
                            onChange={ (event) => {
                                setfinalData(
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
                        <button
                            className={ classes.navButton }
                            onClick={ () => setfinalData(recievedData) }
                        >
                            All
                        </button>

                        <button
                            className={ classes.navButton }
                            onClick={ () => {
                                setfinalData(
                                    recievedData.filter(
                                        (data) => data.owner === 'praks'
                                    )
                                );
                            } }
                        >
                            Owned
                        </button>

                        <button
                            className={ classes.navButton }
                            onClick={ () => {
                                setfinalData(
                                    recievedData.filter(
                                        (data) => data.owner !== 'praks'
                                    )
                                );
                            } }
                        >
                            Bought
                        </button>
                    </div>
                </div>

                {finalData.map((value, index) => {
                    return (
                        <VerticalCard
                            key={ index.toString() }
                            coverImg={ value.coverImg }
                            name={ value.name }
                            updatedAt={ value.updatedAt }
                            owner={ value.owner }
                            numItems={ value.numItems }
                            size={ value.size }
                            type={ value.type }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default DatasetsOwned;
