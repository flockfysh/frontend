import { useState, useRef, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import InfiniteScroll from 'react-infinite-scroller';

import { NextPageWithLayout } from '@/pages/_app';

import MainLayout from '@/components/layout/mainLayout';
import DatasetCard from '@/components/specific/datasets/myDatasets/datasetCard';
import CreateDatasetModal from '@/components/specific/datasets/createDatasetModal';

import api from '@/helpers/api';

import search from '@/icons/main/search.svg';
import sliders from '@/icons/main/sliders.svg';

import classes from './styles.module.css';

const MyDatasets: NextPageWithLayout = function () {
    const [curSearchQuery, setCurSearchQuery] = useState<string>('');

    return (
        <>
            <header className={ classes.header }>
                <label className={ classes.searchBarContainer }>
                    <ReactSVG
                        src={ search.src }
                        className={ classes.searchBarIcon }
                    />

                    <input
                        type="search"
                        className={ classes.searchBarInput }
                        value={ curSearchQuery }
                        onChange={ (e) => {
                            setCurSearchQuery(e.currentTarget.value);
                        } }
                        placeholder="Search"
                    />

                    <button className={ classes.searchFilterButton }>
                        <ReactSVG
                            src={ sliders.src }
                            className={ classes.searchFilterIcon }
                        />
                    </button>
                </label>

                <CreateDatasetModal />
            </header>

            <DatasetSearchResult name={ curSearchQuery || undefined } />
        </>
    );
};

function DatasetSearchResult(props: { name?: string }) {
    const scrollerContainerRef = useRef<HTMLDivElement | null>(null);
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
        datasets: (Flockfysh.Dataset & {
            assetCounts: Flockfysh.DatasetAssetCounts;
        })[];
    }>(initialState);

    useEffect(() => {
        setState(initialState);
    }, [props.name]);

    async function load() {
        const fetched = (
            await api.get<
                Api.PaginatedResponse<
                    (Flockfysh.Dataset & {
                        assetCounts: Flockfysh.DatasetAssetCounts;
                    })[]
                >
            >('/api/datasets/search', {
                params: {
                    name: props.name,
                    next: state.next,
                    expand: 'assetCounts,user,views',
                    limit: 50,
                    sort: 'updatedAt',
                },
            })
        ).data;

        state.datasets.push(...fetched.data);

        setState({
            hasMore: fetched.meta.hasNext,
            datasets: state.datasets,
            next: fetched.meta.next,
        });
    }

    return (
        <div className={ classes.mainContent }>
            <InfiniteScroll
                useWindow={ false }
                loadMore={ load }
                hasMore={ state.hasMore }
                getScrollParent={ () => {
                    return scrollerContainerRef.current;
                } }
            >
                <ul className={ classes.datasetGrid }>
                    { state.datasets.map((dataset) => (
                        <DatasetCard key={ dataset._id } { ...dataset } />
                    )) }
                </ul>
            </InfiniteScroll>
        </div>
    );
}

MyDatasets.getLayout = function (page) {
    return <MainLayout>{ page }</MainLayout>;
};

export default MyDatasets;
