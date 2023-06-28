import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import VerticalCard from '@/components/specific/marketplace/datasetCards/VerticalCard';
import search from '@/icons/main/search.svg';
import classes from './styles.module.css';
import api from '@/helpers/api';
import RadioButtons from '@/components/specific/marketplace/DatasetSettings/RadioButtons';
import InfiniteScroll from 'react-infinite-scroller';

function DatasetsOwned(props: {
    user: BaseUser
}) {
    type FilterType = 'all' | 'owned' | 'shared';

    const [query, setQuery] = useState('');
    const [filterType, setFilterType] = useState<FilterType>('all');

    const initialState = () => {
        return {
            hasMore: true,
            next: undefined,
            datasets: [],
        };
    };

    const [state, setState] = React.useState<{
        hasMore: boolean,
        next: string | undefined,
        datasets: HomepageDataset[],
    }>(initialState);

    async function load() {
        const fetched = (await api.get<Api.PaginatedResponse<HomepageDataset[]>>('/api/datasets/search', {
            params: {
                name: query,
                next: state.next,
                expand: 'assetCounts,size,likes,user',
                limit: 50,
                sort: 'updatedAt',
            }
        })).data;
        state.datasets.push(...fetched.data);
        setState({
            hasMore: fetched.meta.hasNext,
            datasets: state.datasets,
            next: fetched.meta.next,
        });
    }

    React.useEffect(() => {
        setState(initialState);
    }, [query, filterType, props.user._id]);

    React.useEffect(() => {
        setFilterType('all');
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
                            { value: 'all', label: 'All' },
                            { value: 'owned', label: 'Owned' },
                            { value: 'shared', label: 'Shared' }
                        ] }
                        value={ filterType }
                        onChange={ (currentValue) => setFilterType(currentValue as FilterType) }
                    />
                </div>

                <InfiniteScroll useWindow={ false } loadMore={ load } hasMore={ state.hasMore }>
                    {state.datasets.map((value) => {
                        return (
                            <VerticalCard { ...value } key={ value._id }
                            />
                        );
                    })}
                </InfiniteScroll>
            </div>
        </section>
    );
}

export default DatasetsOwned;
