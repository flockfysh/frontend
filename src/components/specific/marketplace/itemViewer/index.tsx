import { useState } from 'react';
import { ReactSVG } from 'react-svg';

import mime from 'mime-types';

import AssetViewer from '@/components/specific/datasets/viewDataset/assetViewer';

import search from '@/icons/main/search.svg';
import grid from '@/icons/main/grid.svg';
import list from '@/icons/main/list.svg';
import database from '@/icons/main/database.svg';

import classes from './styles.module.css';

const TIME_STATES = {
    oneHour: '1h',
    sixHours: '6h',
    oneDay: '24h',
    sevenDays: '7d',
};

export default function ItemViewer(dataset: PreviewDataset) {
    const [showList, setShowList] = useState(true);
    const [timeFilter, setTimeFilter] = useState(TIME_STATES.sixHours);
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
                    <ReactSVG src={ search.src } className={ classes.searchIcon } />

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
                            <ReactSVG className={ classes.icon } src={ grid.src } />
                        </button>

                        <button
                            className={ `${classes.tableViewButton} ${
                                showList ? classes.tableViewButtonActive : ''
                            }` }
                            onClick={ toggleViewToList }
                        >
                            <ReactSVG className={ classes.icon } src={ list.src } />
                        </button>
                    </div>

                    <div className={ classes.tableViewButtonsWrapper }>
                        <button
                            className={ `${classes.tableViewButton} ${
                                timeFilter === TIME_STATES.oneHour
                                    ? classes.tableViewButtonActive
                                    : ''
                            }` }
                            onClick={ () => setTimeFilter(TIME_STATES.oneHour) }
                        >
                            1h
                        </button>

                        <button
                            className={ `${classes.tableViewButton} ${
                                timeFilter === TIME_STATES.sixHours
                                    ? classes.tableViewButtonActive
                                    : ''
                            }` }
                            onClick={ () => setTimeFilter(TIME_STATES.sixHours) }
                        >
                            6h
                        </button>

                        <button
                            className={ `${classes.tableViewButton} ${
                                timeFilter === TIME_STATES.oneDay
                                    ? classes.tableViewButtonActive
                                    : ''
                            }` }
                            onClick={ () => setTimeFilter(TIME_STATES.oneDay) }
                        >
                            24h
                        </button>

                        <button
                            className={ `${classes.tableViewButton} ${
                                timeFilter === TIME_STATES.sevenDays
                                    ? classes.tableViewButtonActive
                                    : ''
                            }` }
                            onClick={ () => setTimeFilter(TIME_STATES.sevenDays) }
                        >
                            7d
                        </button>
                    </div>
                </div>
            </div>

            { /* content */ }
            <div className={ classes.contentContainer }>
                { /* info column */ }
                <div className={ classes.contentInfoContainer }>
                    { /* title */ }
                    <div className={ classes.infoTitleContainer }>
                        <h2 className={ classes.infoTitle }>DATASET explorer</h2>
                    </div>

                    { /* summary */ }
                    <div className={ classes.infoBox }>
                        <div className={ classes.infoBoxTitleContainer }>
                            <h3 className={ classes.infoBoxTitle }>Summary</h3>
                        </div>

                        <div>
                            <p className={ classes.infoBoxSubtitle }>
                                <ReactSVG
                                    className={ classes.infoBoxSubtitleIcon }
                                    src={ database.src }
                                />
                                { dataset.assetCounts.total } Files
                            </p>

                            { Object.entries(dataset.assetCounts.byMimetype).map(([mimetype, count]) => {
                                return (
                                    <div className={ classes.infoBoxSummaryItem } key={ mimetype }>
                                        <span>├─ .{ mime.extension(mimetype) }</span>
                                        <span>{ count }</span>
                                    </div>
                                );
                            }) }
                        </div>
                    </div>

                    { /* file details */ }
                    <div className={ classes.infoBox }>
                        <div className={ classes.infoBoxTitleContainer }>
                            <h3 className={ classes.infoBoxTitle }>File Details</h3>
                        </div>

                        <div className={ classes.infoBoxFileDetailsInnerBox }>
                            <div className={ classes.infoBoxFileDetailsInnerBoxRow }>
                                <div>
                                    <span>Resolution</span>
                                </div>

                                <div>
                                    <span>5760 x 3840</span>
                                </div>
                            </div>
                            
                            <div className={ classes.infoBoxFileDetailsInnerBoxRow }>
                                <div>
                                    <span>Filename</span>
                                </div>

                                <div>
                                    <span>ABCDELKLJK.jpeg</span>
                                </div>
                            </div>

                            <div className={ classes.infoBoxFileDetailsInnerBoxRow }>
                                <div>
                                    <span>Mime type</span>
                                </div>

                                <div>
                                    <span>image/jpeg</span>
                                </div>
                            </div>
                            
                            <div className={ classes.infoBoxFileDetailsInnerBoxRow }>
                                <div>
                                    <span>Uploaded By</span>
                                </div>

                                <div>
                                    <span>@user</span>
                                </div>
                            </div>

                            <div className={ classes.infoBoxFileDetailsInnerBoxRow }>
                                <div>
                                    <span>Encoding</span>
                                </div>

                                <div>
                                    <span>8 Bit</span>
                                </div>
                            </div>

                            <div className={ classes.infoBoxFileDetailsInnerBoxRow }>
                                <div>
                                    <span>File Size</span>
                                </div>
                            
                                <div>
                                    <span>2.63 MB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                { /* grid/list */ }
                <div className={ classes.contentListContainer }>
                    { /* list & grid */ }

                    {
                        <AssetViewer
                            showList={ showList }
                            searchQuery={ {
                                displayName: currentNameQuery || undefined,
                            } }
                            datasetId={ dataset._id }
                        />
                    }
                </div>
            </div>
        </div>
    );
}
