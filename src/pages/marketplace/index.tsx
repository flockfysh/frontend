import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { NextPageWithLayout } from '@/pages/_app';
import MarketplaceNavbar from '@/components/specific/marketplace/navbar';
import VerticalCard from '@/components/specific/marketplace/datasetCards/verticalCard';
import VerticalFocusedCard from '@/components/specific/marketplace/datasetCards/verticalFocusedCard';

import VerticalCollectionCard from '@/components/specific/marketplace/datasetCards/verticalCollectionCard';

import HowToCards from '@/components/specific/marketplace/datasetCards/howToCards';

import classes from './styles.module.css';
import FeaturedDatasetsSection from '@/components/specific/marketplace/FeaturedDatasetsSection';
import DatasetSwiper from '@/components/specific/marketplace/DatasetSwiper';
import { randomUUID } from 'crypto';
import { v4 } from 'uuid';

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
            }
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
        },
        createdAt: new Date(),
        _id: v4(),
        name: 'Dataset name',
        subTags: [],
        tags: [],
        user: '3254235252',
        updatedAt: new Date(),
        public: true,
        price: 2.84448,
        description: 'This is a random test dataset',
    }));

    return (
        <div className={ classes.container }>
            <MarketplaceNavbar/>

            <FeaturedDatasetsSection></FeaturedDatasetsSection>

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

                <DatasetSwiper datasets={ datasets }></DatasetSwiper>

            </section>

            <section className={ classes.sectionContainer }>
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Premium Datasets</h1>
                </div>
                <DatasetSwiper datasets={ datasets }></DatasetSwiper>
            </section>

            <section className={ classes.sectionContainer }>
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Featured Collection</h1>
                </div>

                <div className={ classes.cardContainer }>
                    {/*<VerticalFocusedCard*/}
                    {/*    avatar="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"*/}
                    {/*    name="Dataset Name"*/}
                    {/*    owner="praks"*/}
                    {/*    numDatasets={ 25 }*/}
                    {/*    type="images"*/}
                    {/*/>*/}

                    {/*<VerticalCard*/}
                    {/*    coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"*/}
                    {/*    name="Dataset Name"*/}
                    {/*    owner="praks"*/}
                    {/*    numItems={ 12000 }*/}
                    {/*    size={ 25 }*/}
                    {/*    type="images"*/}
                    {/*/>*/}

                    {/*<VerticalCard*/}
                    {/*    coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"*/}
                    {/*    name="Dataset Name"*/}
                    {/*    owner="praks"*/}
                    {/*    numItems={ 12000 }*/}
                    {/*    size={ 25 }*/}
                    {/*    type="images"*/}
                    {/*/>*/}

                    {/*<VerticalCard*/}
                    {/*    coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"*/}
                    {/*    name="Dataset Name"*/}
                    {/*    owner="praks"*/}
                    {/*    numItems={ 12000 }*/}
                    {/*    size={ 25 }*/}
                    {/*    type="images"*/}
                    {/*/>*/}
                </div>
            </section>

            <section className={ classes.sectionContainer }>
                <h1 className={ classes.header }>Other Collection</h1>
            
                <div className={ classes.cardContainer }>
                    <VerticalCollectionCard
                        avatar="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numDatasets={ 25 }
                        type="images"
                        numContributors={ 20 }
                    />

                    <VerticalCollectionCard
                        avatar="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numDatasets={ 25 }
                        type="images"
                        numContributors={ 20 }
                    />

                    <VerticalCollectionCard
                        avatar="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numDatasets={ 25 }
                        type="images"
                        numContributors={ 20 }
                    />

                    <VerticalCollectionCard
                        avatar="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numDatasets={ 25 }
                        type="images"
                        numContributors={ 20 }
                    />
                </div>
            </section>

            <section className={ classes.sectionContainer }>
                <div className={ classes.trendingHeaderContainer }>
                    <h1 className={ classes.header }>Trending in Segmentations</h1>
                </div>

                <div className={ classes.cardContainer }>
                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numItems={ 12000 }
                        size={ 25 }
                        type="images"
                    />

                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numItems={ 12000 }
                        size={ 25 }
                        type="images"
                    />

                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numItems={ 12000 }
                        size={ 25 }
                        type="images"
                    />

                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numItems={ 12000 }
                        size={ 25 }
                        type="images"
                    />
                </div>
            </section>

            <section className={ classes.sectionContainer + ' ' + classes.howTo }>
                <h1 className={ classes.howToHeader }>Upload, Request, and Share your Datasets</h1>

                <div className={ classes.howToCards }>
                    <HowToCards />
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
