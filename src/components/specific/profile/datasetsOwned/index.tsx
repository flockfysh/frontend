import { useState, useEffect, useContext } from 'react';
import { ReactSVG } from 'react-svg';
import VerticalCard from '@/components/specific/marketplace/datasetCards/verticalCard';
import search from '@/icons/main/search.svg';
import classes from './styles.module.css';
import api from '@/helpers/api';
import RadioButtons from '@/components/ui/input/radioButtons';
import InfiniteScroll from 'react-infinite-scroller';
import { UserContext } from '@/contexts/userContext';

function DatasetsOwned(props: {
    user: BaseUser
}) {
    type FilterType = 'owned' | 'shared';

    const { user } = useContext(UserContext);
    const [query, setQuery] = useState('');
    const [filterType, setFilterType] = useState<FilterType>('owned');
    const isCurrentUser = user?._id === props.user._id;

    const initialState = () => {
        return {
            hasNext: true,
            next: undefined,
            datasets: [],
        };
    };

    const [state, setState] = useState<{
        hasMore: boolean,
        next: string | undefined,
        datasets: HomepageDataset[],
    }>(initialState);

    async function load() {
        let fetched;

        // Public datasets only.
        if (!isCurrentUser) {
            fetched = (await api.get<Api.PaginatedResponse<HomepageDataset[]>>('/api/datasets/search', {
                params: {
                    public: true,
                    user: props.user._id,
                    name: query,
                    next: state.next,
                    expand: 'assetCounts,size,likes,user',
                    limit: 50,
                    sort: 'updatedAt',
                },
            })).data;
        }
        // Includes private datasets.
        else {
            if (filterType === 'owned') {
                fetched = (await api.get<Api.PaginatedResponse<HomepageDataset[]>>('/api/datasets/search', {
                    params: {
                        name: query,
                        next: state.next,
                        expand: 'assetCounts,size,likes,user',
                        limit: 50,
                        sort: 'updatedAt',
                    },
                })).data;
            }
            else {
                fetched = (await api.get<Api.PaginatedResponse<HomepageDataset[]>>('/api/datasets/search/shared', {
                    params: {
                        name: query,
                        next: state.next,
                        expand: 'assetCounts,size,likes,user',
                        limit: 50,
                        sort: 'updatedAt',
                    },
                })).data;
            }
        }

        state.datasets.push(...fetched.data);
        setState({
            hasNext: fetched.meta.hasNext,
            datasets: state.datasets,
            next: fetched.meta.next,
        });
    }

    useEffect(() => {
        setState(initialState);
    }, [query, filterType, props.user._id]);

    useEffect(() => {
        setFilterType('owned');
    }, [props.user._id]);

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
                                setQuery(event.currentTarget.value);
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

                    <RadioButtons
                        options={ [
                            { value: 'owned', label: 'Owned' },
                            { value: 'shared', label: 'Shared', shown: isCurrentUser },
                        ] }
                        value={ filterType }
                        onChange={ (currentValue) => setFilterType(currentValue as FilterType) }
                    />
                </div>

                <InfiniteScroll useWindow={ false } loadMore={ load } hasMore={ state.hasNext }
                                className={ classes.datasetGrid }>
                    { state.datasets.map((value) => {
                        return (
                            <VerticalCard { ...value } key={ value._id } className={ classes.verticalCard }
                            />
                        );
                    }) }
                </InfiniteScroll>
            </div>
        </section>
    );
}

export default DatasetsOwned;
