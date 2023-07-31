import { useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import InfiniteScroll from 'react-infinite-scroller';

import _dayjs from 'dayjs';
import { useStateWithDeps } from 'use-state-with-deps';

import RadioButtons from '@/components/ui/input/radioButtons';
import { ContributionItem } from './contributionItem';

import api from '@/helpers/api';

import search from '@/icons/main/search.svg';
import database from '@/icons/main/database.svg';

import classes from './styles.module.css';

const TIME_STATES: {
    label: string;
    value: [number, _dayjs.ManipulateType] | null;
}[] = [
    { label: 'All', value: null },
    { label: '1h', value: [1, 'hour'] },
    { label: '6h', value: [6, 'hours'] },
    { label: '24h', value: [24, 'hours'] },
    { label: '7d', value: [7, 'days'] },
];

export default function ContributionList(dataset: PreviewDataset) {
    const scrollerContainerRef = useRef<HTMLDivElement | null>(null);
    const [_timeFilter, _setTimeFilter] = useState(0);
    const [currentNameQuery, setCurrentNameQuery] = useState('');

    const [state, setState] = useStateWithDeps<{
        next?: string;
        hasNext: boolean;
        contributions: ExpandedPullRequest[];
    }>(initialState, [currentNameQuery, dataset._id]);

    function initialState(): typeof state {
        return {
            next: undefined,
            hasNext: true,
            contributions: [],
        };
    }

    const getContributions = async () => {
        if (state.hasNext) {
            const temp = (
                await api.get<Api.PaginatedResponse<ExpandedPullRequest[]>>(
                    `/api/datasets/${dataset._id}/pullRequests`,
                    {
                        params: {
                            expand: 'user,stats',
                            name: currentNameQuery,
                            limit: 10,
                            next: state.next,
                        },
                    }
                )
            ).data;

            console.log('from backend', temp);

            setState((prevState) => {
                prevState.contributions.push(...temp.data);
                return {
                    ...prevState,
                    hasNext: temp.meta.hasNext,
                    next: temp.meta.next,
                };
            });

            console.log(state.contributions);
        }
    };

    console.log('from contributions', dataset);
    console.log('contributions array', state.contributions);

    return (
        <div className={ classes.itemsContainer }>
            { /* header */ }
            <div className={ classes.mainContentHeader }>
                <label className={ classes.searchContainer }>
                    <ReactSVG src={ search.src } className={ classes.searchIcon } />

                    <input
                        type="search"
                        className={ classes.search }
                        placeholder="Search by user, title"
                        value={ currentNameQuery }
                        onChange={ (e) => {
                            setCurrentNameQuery(e.currentTarget.value);
                        } }
                    />
                </label>

                <div className={ classes.headerButtonsWrapper }>
                    <div className={ classes.tableViewButtonsWrapper }>
                        <RadioButtons options={ TIME_STATES } />
                    </div>
                </div>
            </div>

            { /* content */ }
            <div
                className={ classes.contentContainer }
                ref={ scrollerContainerRef }
            >
                { /* contribution list */ }
                <InfiniteScroll
                    hasMore={ state.hasNext }
                    useWindow={ false }
                    loadMore={ getContributions }
                    className={ classes.contentListContainer }
                    getScrollParent={ () => scrollerContainerRef.current }
                >
                    { state.contributions.map((item) => (
                        <ContributionItem
                            key={ item._id }
                            datasetId={ dataset._id }
                            contribution={ item }
                        />
                    )) }
                </InfiniteScroll>

                { /* info column */ }
                <div className={ classes.contentInfoContainer }>
                    { /* title */ }
                    <div className={ classes.infoTitleContainer }>
                        <h2 className={ classes.infoTitle }>
                            Contribution Stats
                        </h2>
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
                                { /* {dataset.assetCounts.total} Files */ }
                            </p>

                            { /* {Object.entries(dataset.assetCounts.byMimetype).map(
                ([mimetype, count]) => {
                  return (
                    <div className={classes.infoBoxSummaryItem} key={mimetype}>
                      <span>├─ .{mime.extension(mimetype)}</span>
                      <span>{count}</span>
                    </div>
                  );
                }
              )} */ }
                        </div>
                    </div>

                    { /* file details */ }
                    <div className={ classes.infoBox }>
                        <div className={ classes.infoBoxTitleContainer }>
                            <h3 className={ classes.infoBoxTitle }>
                                File Details
                            </h3>
                        </div>

                        <div className={ classes.infoBoxFileDetailsInnerBox }>
                            <div
                                className={
                                    classes.infoBoxFileDetailsInnerBoxRow
                                }
                            >
                                <div>
                                    <span>Resolution</span>
                                </div>

                                <div>
                                    <span>5760 x 3840</span>
                                </div>
                            </div>

                            <div
                                className={
                                    classes.infoBoxFileDetailsInnerBoxRow
                                }
                            >
                                <div>
                                    <span>Filename</span>
                                </div>

                                <div>
                                    <span>ABCDELKLJK.jpeg</span>
                                </div>
                            </div>

                            <div
                                className={
                                    classes.infoBoxFileDetailsInnerBoxRow
                                }
                            >
                                <div>
                                    <span>Mime type</span>
                                </div>

                                <div>
                                    <span>image/jpeg</span>
                                </div>
                            </div>

                            <div
                                className={
                                    classes.infoBoxFileDetailsInnerBoxRow
                                }
                            >
                                <div>
                                    <span>Uploaded By</span>
                                </div>

                                <div>
                                    <span>@user</span>
                                </div>
                            </div>

                            <div
                                className={
                                    classes.infoBoxFileDetailsInnerBoxRow
                                }
                            >
                                <div>
                                    <span>Encoding</span>
                                </div>

                                <div>
                                    <span>8 Bit</span>
                                </div>
                            </div>

                            <div
                                className={
                                    classes.infoBoxFileDetailsInnerBoxRow
                                }
                            >
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
            </div>
        </div>
    );
}
