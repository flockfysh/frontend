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

const Marketplace: NextPageWithLayout = function () {
    const datasets: HomepageDataset[] = Array.from({ length: 8 }, () => ({
        type: 'image',
        likes: 50,
        assetCounts: {
            total: 12000,
            byStage: {
                feedback: 0,
                completed: 19950,
                uploaded: 50,
            },
            byAnnotationStatus: {
                annotated: 20000,
                unannotated: 0,
            },
            byMimetype: {}
        },
        size: {
            total: {
                total: 2 * 1024 ** 3,
                cloud: 1024 ** 3,
                cluster: 1024 ** 3,
            },
            byStage: {
                uploaded: 500 * 1024 ** 2,
                feedback: 500 * 1024 ** 2,
                completed: 500 * 1024 ** 2,
            },
            byMimetype: {}
        },
        metrics: {
            downloads: 0,
            views: 0,
        },
        user: {
            username: 'praks',
            _id: '24159335',
            fullName: 'Prakriti Bista',
            firstName: 'Prakriti',
            email: 'praks@gmail.com',
            lastName: 'Bista',
        },
        createdAt: new Date(),
        _id: v4(),
        name: 'Dataset name',
        subTags: [],
        tags: [],
        updatedAt: new Date(),
        public: true,
        price: 2.84448,
        description: 'This is a random test dataset',
    }));

    const featuredDatasets: HomepageDataset[] = Array.from({ length: 8 }, () => ({
        type: 'image',
        likes: 50,
        assetCounts: {
            total: 450,
            byStage: {
                feedback: 0,
                completed: 400,
                uploaded: 50,
            },
            byAnnotationStatus: {
                annotated: 450,
                unannotated: 0,
            },
            byMimetype: {}
        },
        metrics: {
            downloads: 0,
            views: 0,
        },
        size: {
            total: {
                total: Math.random() * 5 * 1024 ** 3,
                cloud: 1024 ** 3,
                cluster: 1024 ** 3,
            },
            byStage: {
                uploaded: 0.5 * 1024 ** 2,
                feedback: 0,
                completed: 4 * 1024 ** 2,
            },
        },
        user: {
            username: 'praks',
            _id: '24159335',
            fullName: 'Prakriti Bista',
            firstName: 'Prakriti',
            email: 'praks@gmail.com',
            lastName: 'Bista',
        },
        createdAt: new Date(),
        _id: v4(),
        name: fakerEN.animal.type(),
        subTags: [],
        tags: [],
        updatedAt: new Date(),
        public: true,
        price: 2.84448,
        description: 'This is a random test dataset',
    }));

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

            <FeaturedDatasetsSection datasets={ featuredDatasets }></FeaturedDatasetsSection>

            <section className={ classes.sectionContainer }>
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Trending Datasets</h1>

                    <div className={ classes.trendingFilterContainer }>
                        <div className={ classes.trendingFilterGrid }>
                            <div>1h</div>
                        </div>

                        <div className={ classes.trendingFilterGrid }>
                            <div>6h</div>
                        </div>

                        <div className={ classes.trendingFilterGrid }>
                            <div>24h</div>
                        </div>

                        <div className={ classes.trendingFilterGrid }>
                            <div>7d</div>
                        </div>
                    </div>
                </div>

                <DatasetSwiper cardType={ 'vertical' } datasets={ datasets }></DatasetSwiper>

            </section>

            <section className={ classes.sectionContainer }>
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Premium Datasets</h1>
                </div>
                <DatasetSwiper cardType={ 'vertical' } datasets={ datasets }></DatasetSwiper>
            </section>

            <section className={ classes.sectionContainer }>
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Trending Collections</h1>
                </div>

                <CollectionSwiper collections={ collections }></CollectionSwiper>
            </section>

            <section className={ classes.sectionContainer }>
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Trending in Segmentations</h1>
                </div>

                <DatasetSwiper cardType={ 'vertical' } datasets={ datasets }></DatasetSwiper>

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
