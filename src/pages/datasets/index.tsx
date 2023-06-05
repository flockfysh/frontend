import { NextPageWithLayout } from '@/pages/_app';
import { ReactSVG } from 'react-svg';

import { v4 } from 'uuid';
import dayjs from 'dayjs';

import MainLayout from '@/components/layout/MainLayout';
import DatasetCard from '@/components/specific/datasets/myDatasets/DatasetCard';
import CreateDatasetModal from '@/components/specific/datasets/createDatasetModal';

import search from '@/icons/main/search.svg';
import sliders from '@/icons/main/sliders.svg';

import classes from './styles.module.css';
import React from 'react';
import api from '@/helpers/api';
import InfiniteScroll from 'react-infinite-scroller';

const MyDatasets: NextPageWithLayout = function () {
    const [curSearchQuery, setCurSearchQuery] = React.useState<string>('');

    return (
        <>
            <header className={ classes.header }>
                <label className={ classes.searchBarContainer }>
                    <ReactSVG src={ search.src } className={ classes.searchBarIcon }/>

                    <input type="search" className={ classes.searchBarInput } value={ curSearchQuery } onChange={ (e) => {
                        setCurSearchQuery(e.currentTarget.value);
                    } } placeholder="Search"/>

                    <button className={ classes.searchFilterButton }>
                        <ReactSVG src={ sliders.src } className={ classes.searchFilterIcon }/>
                    </button>
                </label>

                <CreateDatasetModal/>

            </header>

            <DatasetSearchResult name={ curSearchQuery || undefined }></DatasetSearchResult>
        </>
    );
};

function DatasetSearchResult(props: { name?: string }) {
    const scrollerContainerRef = React.useRef<HTMLDivElement | null>(null);
    const initialState = () => {
        return {
            hasMore: true,
            prevId: undefined,
            datasets: [],
        };
    };
    const [state, setState] = React.useState<{
        hasMore: boolean,
        prevId: string | undefined,
        datasets: (Flockfysh.Dataset & {
            assetCounts: Flockfysh.DatasetAssetCounts
        })[],
    }>(initialState);

    async function load() {
        const fetched = (await api.get<{
            success: true,
            data: (Flockfysh.Dataset & {
                assetCounts: Flockfysh.DatasetAssetCounts
            })[]
        }>('/api/datasets/search', {
            params: {
                name: props.name,
                lessThan: state.prevId,
                expand: 'assetCounts',
                limit: 50,
            }
        })).data.data;
        state.datasets.push(...fetched);
        setState({
            hasMore: fetched.length > 0,
            datasets: state.datasets,
            prevId: fetched[fetched.length - 1]?._id,
        });
    }

    return (
        <div className={ classes.mainContent }>
            <InfiniteScroll useWindow={ false } loadMore={ load } hasMore={ state.hasMore } getScrollParent={ () => {
                return scrollerContainerRef.current;
            } }>
                <ul className={ classes.datasetGrid }>
                    {state.datasets.map(dataset => <DatasetCard key={ dataset._id } { ...dataset } />)}
                </ul>
            </InfiniteScroll>
        </div>
    );
}

MyDatasets.getLayout = function (page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    );
};


export default MyDatasets;
