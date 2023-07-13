import { useState } from 'react';
import { ReactSVG } from 'react-svg';

import mime from 'mime-types';

import AssetViewer from '@/components/specific/datasets/viewDataset/assetViewer';

import search from '@/icons/main/search.svg';
import grid from '@/icons/main/grid.svg';
import list from '@/icons/main/list.svg';

import classes from './styles.module.css';

export default function PostItemViewer(posts: HomepagePost) {
    const [showList, setShowList] = useState(true);
    const [currentNameQuery, setCurrentNameQuery] = useState('');

    const toggleViewToList = () => {
        setShowList(true);
    };

    const toggleViewToGrid = () => {
        setShowList(false);
    };

    return (
        <div className={ classes.itemsContainer }>
            { /* header */ }
            <div className={ classes.mainContentHeader }>
                <label className={ classes.searchContainer }>
                    <ReactSVG src={ search.src } className={ classes.searchIcon }/>

                    <input
                        type="search"
                        className={ classes.search }
                        placeholder="Search by file name, extention"
                        value={ currentNameQuery }
                        onChange={ (e) => {
                            setCurrentNameQuery(e.currentTarget.value);
                        } }
                    />
                </label>

                <div className={ classes.headerButtonsWrapper }>
                    <div className={ classes.tableViewButtonsWrapper }>
                        <button
                            className={ `${classes.tableViewButton} ${
                                !showList ? classes.tableViewButtonActive : ''
                            }` }
                            onClick={ toggleViewToGrid }
                        >
                            <ReactSVG className={ classes.icon } src={ grid.src }/>
                        </button>

                        <button
                            className={ `${classes.tableViewButton} ${
                                showList ? classes.tableViewButtonActive : ''
                            }` }
                            onClick={ toggleViewToList }
                        >
                            <ReactSVG className={ classes.icon } src={ list.src }/>
                        </button>
                    </div>

                </div>
            </div>

            { /* content */ }
            <div className={ classes.contentContainer }>
                { /* info column */ }
                <div className={ classes.contentInfoContainer }>
                    
                </div>
            </div>
        </div>
    );
}
