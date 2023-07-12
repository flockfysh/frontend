import { useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';

import { v4 } from 'uuid';
import { ManipulateType } from 'dayjs';
import { fakerEN } from '@faker-js/faker';

import HowToCards from '@/components/specific/marketplace/datasetCards/howToCards';
import FeaturedDatasetsSection from '@/components/specific/marketplace/featuredDatasetsSection';
import DatasetSwiper from '@/components/specific/marketplace/datasetSwiper';
import CollectionSwiper from '@/components/specific/marketplace/collectionSwiper';
import DatasetTimeFilter from '@/components/specific/marketplace/datasetTimeFilter';

import api from '@/helpers/api';
import { dayjs } from '@/helpers/date';

import 'swiper/css';
import 'swiper/css/navigation';

import MarketplaceLayout from '@/components/layout/marketplaceLayout';
import classes from './styles.module.css';
import PostSwiper from '@/components/specific/marketplace/postSwiper';

const timeFilterOptions: [number, ManipulateType][] = [
    [1, 'day'],
    [1, 'week'],
    [1, 'month'],
];

const Marketplace: NextPageWithLayout = function () {
    const [timeFilter, setTimeFilter] = useState(0);

    const [featuredDatasets, setFeaturedDatasets] = useState<HomepageDataset[]>(
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

    const collections: HomepageCollection[] = Array.from({ length: 8 }, () => {
        return {
            _id: v4(),
            name: fakerEN.animal.type(),
            user: {
                username: 'praks',
                _id: '24159335',
                fullName: 'Prakriti Bista',
                firstName: 'Prakriti',
                email: 'praks@gmail.com',
                lastName: 'Bista',
            },
            itemCount: 20,
            type: 'image',
            thumbnail: {
                assetId: v4(),
                url: 'https://images.unsplash.com/photo-1555412654-72a95a495858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            },
        };
    });

    const posts: HomepagePost[] = Array.from({ length: 6 }, () => {
        return {
            _id: v4(),
            name: fakerEN.vehicle.type(),
            content: "No content",
            user: {
                username: 'praks',
                _id: '24159335',
                fullName: 'Prakriti Bista',
                firstName: 'Prakriti',
                email: 'praks@gmail.com',
                lastName: 'Bista',
            },
            likes: 20,
            views: 30,
        };
    });

    return (
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

                <CollectionSwiper collections={ collections } />
            </section>

            <section className={ classes.sectionContainer }>
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Posts</h1>
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
    );
};

Marketplace.getLayout = function (page) {
    return <MarketplaceLayout>{ page }</MarketplaceLayout>;
};

export default Marketplace;
