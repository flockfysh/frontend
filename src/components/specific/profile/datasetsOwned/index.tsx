import { useState, useEffect, useContext } from 'react';
import { ReactSVG } from 'react-svg';
import InfiniteScroll from 'react-infinite-scroller';

import VerticalCard from '@/components/specific/marketplace/datasetCards/verticalCard';
import RadioButtons from '@/components/ui/input/radioButtons';

import api from '@/helpers/api';

import { UserContext } from '@/contexts/userContext';

import search from '@/icons/main/search.svg';

import classes from './styles.module.css';

export default function DatasetsOwned(props: { user: BaseUser }) {
    type FilterType = 'owned' | 'shared' | 'bookmarked';

    const { user } = useContext(UserContext);
    const [query, setQuery] = useState('');
    const [filterType, setFilterType] = useState<FilterType>('owned');
    const isCurrentUser = user?._id === props.user._id;

    const initialState = () => {
        return {
            hasMore: true,
            next: undefined,
            datasets: [],
        };
    };

    const [state, setState] = useState<{
        hasMore: boolean;
        next: string | undefined;
        datasets: HomepageDataset[];
    }>(initialState);

    async function load() {
        let fetched;

        // Public datasets only.
        if (!isCurrentUser)
            fetched = (
                await api.get<Api.PaginatedResponse<HomepageDataset[]>>(
                    '/api/datasets/search',
                    {
                        params: {
                            public: true,
                            user: props.user._id,
                            name: query,
                            next: state.next,
                            expand: 'assetCounts,size,likes,user',
                            limit: 50,
                            sort: 'updatedAt',
                        },
                    }
                )
            ).data;
        // Includes private datasets.
        else {
            if (filterType === 'owned')
                fetched = (
                    await api.get<Api.PaginatedResponse<HomepageDataset[]>>(
                        '/api/datasets/search',
                        {
                            params: {
                                name: query,
                                next: state.next,
                                expand: 'assetCounts,size,likes,user',
                                limit: 50,
                                sort: 'updatedAt',
                            },
                        }
                    )
                ).data;
            else if (filterType === 'shared')
                fetched = (
                    await api.get<Api.PaginatedResponse<HomepageDataset[]>>(
                        '/api/datasets/search/shared',
                        {
                            params: {
                                name: query,
                                next: state.next,
                                expand: 'assetCounts,size,likes,user',
                                limit: 50,
                                sort: 'updatedAt',
                            },
                        }
                    )
                ).data;
            else
                fetched = (
                    await api.get<Api.PaginatedResponse<HomepageDataset[]>>(
                        '/api/datasets/search/bookmarked',
                        {
                            params: {
                                name: query,
                                next: state.next,
                                expand: 'assetCounts,size,likes,user',
                                limit: 50,
                                sort: 'updatedAt',
                            },
                        }
                    )
                ).data;
        }

        state.datasets.push(...fetched.data);

        setState({
            hasMore: fetched.meta.hasNext,
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
                            {
                                value: 'shared',
                                label: 'Shared',
                                shown: isCurrentUser,
                            },
                            { value: 'Bookmarked', label: 'Bookmarked' },
                        ] }
                        value={ filterType }
                        onChange={ (currentValue) =>
                            setFilterType(currentValue as FilterType)
                        }
                    />
                </div>

                { state.datasets.length === 0 && (
                    <div>
                        <p>
                            No datasets found. Click the plus icon in the navbar
                            to create one
                        </p>
                    </div>
                ) }

                <InfiniteScroll
                    useWindow={ false }
                    loadMore={ load }
                    hasMore={ state.hasMore }
                    className={ classes.datasetGrid }
                >
                    { state.datasets.map((value) => {
                        return (
                            <VerticalCard
                                { ...value }
                                key={ value._id }
                                className={ classes.verticalCard }
                            />
                        );
                    }) }
                </InfiniteScroll>
            </div>
        </section>
    );
}
