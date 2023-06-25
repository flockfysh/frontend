import 'swiper/css';
import 'swiper/css/navigation';
import { NextPageWithLayout } from '@/pages/_app';
import MarketplaceNavbar from '@/components/specific/marketplace/Navbar';
import HowToCards from '@/components/specific/marketplace/datasetCards/HowToCards';
import classes from './styles.module.css';
import FeaturedDatasetsSection from '@/components/specific/marketplace/FeaturedDatasetsSection';
import DatasetSwiper from '@/components/specific/marketplace/DatasetSwiper';
import { v4 } from 'uuid';
import { fakerEN } from '@faker-js/faker';
import CollectionSwiper from '@/components/specific/marketplace/CollectionSwiper';
import DatasetTimeFilter from '@/components/specific/marketplace/datasetTimeFilter';
import { useEffect, useState } from 'react';
import api from '@/helpers/api';
import { dayjs } from '@/helpers/date';

const Marketplace: NextPageWithLayout = function () {
    const [featuredDatasets, setFeaturedDatasets] = useState<HomepageDataset[]>([]);
    useEffect(() => {
        async function fetch() {
            const result = (await api.get<Api.PaginatedResponse<HomepageDataset[]>>('/api/datasets/search', {
                params: {
                    public: true,
                    sort: 'metrics.views',
                    expand: 'assetCounts,size,likes,user,thumbnail,url',
                    ascending: false,
                    limit: 8,
                }
            })).data.data;
            setFeaturedDatasets(result);
        }

        fetch().then();
    }, []);

    const [trendingDatasets, setTrendingDatasets] = useState<HomepageDataset[]>([]);
    useEffect(() => {
        async function fetch() {
            const result = (await api.get<Api.PaginatedResponse<HomepageDataset[]>>('/api/datasets/search', {
                params: {
                    public: true,
                    sort: 'relevance',
                    expand: 'assetCounts,size,likes,user,thumbnail,url',
                    ascending: false,
                    limit: 8,
                    relevancePeriod: dayjs().subtract(20, 'days').toString(),
                }
            })).data.data;
            setTrendingDatasets(result);
        }

        fetch().then();
    }, []);

    const [popularDatasets, setPopularDatasets] = useState<HomepageDataset[]>([]);
    useEffect(() => {
        async function fetch() {
            const result = (await api.get<Api.PaginatedResponse<HomepageDataset[]>>('/api/datasets/search', {
                params: {
                    public: true,
                    sort: 'likes',
                    expand: 'assetCounts,size,likes,user,thumbnail,url',
                    ascending: false,
                    limit: 8,
                }
            })).data.data;
            setPopularDatasets(result);
        }

        fetch().then();
    }, []);

    const [paidDatasets, setPaidDatasets] = useState<HomepageDataset[]>([]);
    useEffect(() => {
        async function fetch() {
            const result = (await api.get<Api.PaginatedResponse<HomepageDataset[]>>('/api/datasets/search', {
                params: {
                    public: true,
                    sort: 'metrics.views',
                    expand: 'assetCounts,size,likes,user,thumbnail,url',
                    ascending: false,
                    paid: true,
                    limit: 8,
                }
            })).data.data;
            setPaidDatasets(result);
        }

        fetch().then();
    }, []);

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
                url: 'https://s3-alpha-sig.figma.com/img/49ee/d081/4307a875ed2dabf708582228964d3985?Expires=1687737600&Signature=kNAl46fRLyUSGUSIVv7qu5BiKptidiRojEkUy7YkIstv9E28TmP1rOHcXxemh9CBjcUrn9dlLoyE4hixT1q~mHfnLqPWh1DZRPfZS5GBnZdnQMcXf~8cJ42RrhE3ZtfNAj9a97mf~maOqZ2tG7~NTMPsKtoGBqm8ZM02xlqPHVraEdWY39KcZhi5qS4DGL~6ZXnucPBTSa1wd-ZpHfMhFUI6b-IBCKPyGkXpy03oOD00X13R-3aQUJNoLnjHdD31OLXO~EGJI4XOynNhaJk2-91ca5ZvT3qcbTJy2pAivz3s2-wCtLQY8suZcPhTGFSqnI~k8sJQ-6Zde6DTFrXVzw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            }
        };
    });

    return (
        <div className={ classes.container }>
            <MarketplaceNavbar/>

            {!!featuredDatasets.length &&
                <FeaturedDatasetsSection datasets={ featuredDatasets }></FeaturedDatasetsSection>
            }

            {!!trendingDatasets.length && (
                <section className={ classes.sectionContainer }>
                    <div className={ classes.headerContainer }>
                        <h1 className={ classes.header }>Trending Datasets</h1>

                        <DatasetTimeFilter
                            callback={ () => {
                            } }
                            options={ ['1d', '7d', '1m'] }
                            selected={ 0 }/>
                    </div>

                    <DatasetSwiper cardType={ 'vertical' } datasets={ trendingDatasets }></DatasetSwiper>
                </section>
            )}

            {!!popularDatasets.length && (
                <section className={ classes.sectionContainer }>
                    <div className={ classes.headerContainer }>
                        <h1 className={ classes.header }>Most Popular Datasets</h1>
                    </div>

                    <DatasetSwiper cardType={ 'vertical' } datasets={ popularDatasets }></DatasetSwiper>
                </section>
            )}

            {!!paidDatasets.length && (
                <section className={ classes.sectionContainer }>
                    <div className={ classes.headerContainer }>
                        <h1 className={ classes.header }>Premium Datasets</h1>
                    </div>
                    <DatasetSwiper cardType={ 'vertical' } datasets={ paidDatasets }></DatasetSwiper>
                </section>
            )}

            <section className={ classes.sectionContainer }>
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Trending Collections</h1>
                </div>

                <CollectionSwiper collections={ collections }></CollectionSwiper>
            </section>

            <section className={ classes.sectionContainer + ' ' + classes.howTo }>
                <h1 className={ classes.howToHeader }>Upload, Request, and Share your Datasets</h1>

                <div className={ classes.howToCards }>
                    <HowToCards/>
                </div>
            </section>
        </div>
    );
};

Marketplace.getLayout = function (page) {
    return (
        <>
            {page}
        </>
    );
};

export default Marketplace;
