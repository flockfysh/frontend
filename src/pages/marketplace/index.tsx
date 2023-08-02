import { useContext, useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';

import { v4 } from 'uuid';
import { ManipulateType } from 'dayjs';
import { fakerEN } from '@faker-js/faker';

import HowToCards from '@/components/specific/marketplace/datasetCards/howToCards';
import FeaturedDatasetsSection from '@/components/specific/marketplace/featuredDatasetsSection';
import DatasetSwiper from '@/components/specific/marketplace/datasetSwiper';
import CollectionSwiper from '@/components/specific/marketplace/collectionSwiper';
import DatasetTimeFilter from '@/components/specific/marketplace/datasetTimeFilter';
import MarketplaceLayout from '@/components/layout/marketplaceLayout';
import PostSwiper from '@/components/specific/marketplace/postSwiper';

import { PostContext } from '@/contexts/postContext';

import api from '@/helpers/api';
import { dayjs } from '@/helpers/date';

import 'swiper/css';
import 'swiper/css/navigation';

import classes from './styles.module.css';
import { NextSeo } from 'next-seo';

const timeFilterOptions: [number, ManipulateType][] = [
    [1, 'day'],
    [1, 'week'],
    [1, 'month'],
];

function Marketplace() {
    const [timeFilter, setTimeFilter] = useState(0);

    const [featuredDatasets, setFeaturedDatasets] = useState<HomepageDataset[]>(
        []
    );
    const { posts, setPosts } = useContext(PostContext);

    useEffect(() => {
        async function fetch() {
            const result = (
                await api.get<Api.PaginatedResponse<HomepageDataset[]>>(
                    '/api/datasets/search',
                    {
                        params: {
                            public: true,
                            sort: 'metrics.views',
                            expand: 'assetCounts,size,likes,user,thumbnail,url',
                            ascending: false,
                            limit: 8,
                        },
                    }
                )
            ).data.data;

            setFeaturedDatasets(result);
        }

        fetch().then();
    }, []);

    const [trendingDatasets, setTrendingDatasets] = useState<HomepageDataset[]>(
        []
    );

    useEffect(() => {
        async function fetch() {
            const result = (
                await api.get<Api.PaginatedResponse<HomepageDataset[]>>(
                    '/api/datasets/search',
                    {
                        params: {
                            public: true,
                            sort: 'relevance',
                            expand: 'assetCounts,size,likes,user,thumbnail,url',
                            ascending: false,
                            limit: 8,
                            relevancePeriod: dayjs()
                                .subtract(...timeFilterOptions[timeFilter])
                                .toString(),
                        },
                    }
                )
            ).data.data;

            setTrendingDatasets(result);
        }

        fetch().then();
    }, [timeFilter]);

    const [popularDatasets, setPopularDatasets] = useState<HomepageDataset[]>(
        []
    );

    useEffect(() => {
        async function fetch() {
            const result = (
                await api.get<Api.PaginatedResponse<HomepageDataset[]>>(
                    '/api/datasets/search',
                    {
                        params: {
                            public: true,
                            sort: 'likes',
                            expand: 'assetCounts,size,likes,user,thumbnail,url',
                            ascending: false,
                            limit: 8,
                        },
                    }
                )
            ).data.data;
            setPopularDatasets(result);
        }

        fetch().then();
    }, []);

    const [paidDatasets, setPaidDatasets] = useState<HomepageDataset[]>([]);
    useEffect(() => {
        async function fetch() {
            const result = (
                await api.get<Api.PaginatedResponse<HomepageDataset[]>>(
                    '/api/datasets/search',
                    {
                        params: {
                            public: true,
                            sort: 'metrics.views',
                            expand: 'assetCounts,size,likes,user,thumbnail,url',
                            ascending: false,
                            paid: true,
                            limit: 8,
                        },
                    }
                )
            ).data.data;
            setPaidDatasets(result);
        }

        fetch().then();
    }, [timeFilter]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get('/api/posts/');
            setPosts(res.data.data);
        };

        fetchData();
    }, [setPosts]);

    const [collectionsByTags, setCollections] = useState<HomepageCollection[]>(
        []
    );


    useEffect(() => {
        const fetchData = async () => {
            const res = (await api.get('/api/datasets/topDatasetsByTags')).data.data;

            const ret = res.map((it:any, index:number) => {
                return {
                    id: index,
                    ...it
                };
            });

            setCollections(ret);
        };
        fetchData();
    }, []);

    return (


        <>
            <NextSeo
                title={ `flockfysh | data exchange` }
                description={ `The flockfysh data exchange serves as the main platform to connect with other passionate AI lovers and buy and build large scale AI datasets and models. There are ${1000} datasets for this, ranging from text problems like question answer, LLM evaluation, to computer vision problems
                such as object detection, segmentations, and keypoint trackings. Buy or build your next dataset of your dreams here today!` }
            />

            <div className={ classes.container }>
                        { !!featuredDatasets.length && (
                            <FeaturedDatasetsSection datasets={ featuredDatasets } />
                        ) }

                        { !!trendingDatasets.length && (
                            <section className={ classes.sectionContainer }>
                                <div className={ classes.headerContainer }>
                                    <h1 className={ classes.header }>Trending Datasets</h1>

                                    <DatasetTimeFilter
                                        callback={ (index) => {
                                            setTimeFilter(index);
                                        } }
                                        options={ timeFilterOptions }
                                        selected={ timeFilter }
                                    />
                                </div>

                                <DatasetSwiper
                                    cardType="vertical"
                                    datasets={ trendingDatasets }
                                />
                            </section>
                        ) }

                        { !!popularDatasets.length && (
                            <section className={ classes.sectionContainer }>
                                <div className={ classes.headerContainer }>
                                    <h1 className={ classes.header }>
                                        Most Popular Datasets
                                    </h1>
                                </div>

                                <DatasetSwiper
                                    cardType="vertical"
                                    datasets={ popularDatasets }
                                />
                            </section>
                        ) }

                        { !!paidDatasets.length && (
                            <section className={ classes.sectionContainer }>
                                <div className={ classes.headerContainer }>
                                    <h1 className={ classes.header }>Premium Datasets</h1>
                                </div>

                                <DatasetSwiper
                                    cardType="vertical"
                                    datasets={ paidDatasets }
                                />
                            </section>
                        ) }

                        <section className={ classes.sectionContainer }>
                            <div className={ classes.headerContainer }>
                                <h1 className={ classes.header }>Trending Collections</h1>
                            </div>

                            <CollectionSwiper collections={ collectionsByTags } /> 
                        </section>

                        <section className={ classes.sectionContainer }>
                            <div className={ classes.headerContainer }>
                                <h1 className={ classes.header }>Popular Posts</h1>
                            </div>

                            <PostSwiper posts={ posts } />
                        </section>

                        <section className={ classes.sectionContainer + ' ' + classes.howTo }>
                            <h1 className={ classes.howToHeader }>
                                Upload, Request, and Share your Datasets
                            </h1>

                            <div className={ classes.howToCards }>
                                <HowToCards />
                            </div>
                        </section>
                    </div>


        </>
    );
}

(Marketplace as NextPageWithLayout).getLayout = function (page) {
    return <MarketplaceLayout>{ page }</MarketplaceLayout>;
};

export default Marketplace;
