import { NextPageWithLayout } from '@/pages/_app';

import { v4 } from 'uuid';
import { fakerEN } from '@faker-js/faker';

import MarketplaceNavbar from '@/components/specific/marketplace/navbar';
import VerticalCard from '@/components/specific/marketplace/datasetCards/verticalCard';
import VerticalFocusedCard from '@/components/specific/marketplace/datasetCards/verticalFocusedCard';
import VerticalCollectionCard from '@/components/specific/marketplace/datasetCards/verticalCollectionCard';

import HowToCards from '@/components/specific/marketplace/datasetCards/howToCards';

import FeaturedDatasetsSection from '@/components/specific/marketplace/featuredDatasetsSection';
import DatasetSwiper from '@/components/specific/marketplace/datasetSwiper';

import DatasetTimeFilter from '@/components/specific/marketplace/datasetTimeFilter';

import 'swiper/css';
import 'swiper/css/navigation';

import classes from './styles.module.css';

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
            }
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

    return (
        <div className={ classes.container }>
            <MarketplaceNavbar />

            <FeaturedDatasetsSection datasets={ featuredDatasets } />

            <section className={ classes.sectionContainer }>
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Trending Datasets</h1>

                    <DatasetTimeFilter callback={ () => {} } options={ ['1h', '1d', '7d', '1m'] } selected={ 0 } />
                </div>

                <DatasetSwiper cardType="vertical" datasets={ datasets } />
            </section>

            <section className={ classes.sectionContainer }>
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Premium Datasets</h1>
                </div>

                <DatasetSwiper cardType="vertical" datasets={ datasets } />
            </section>

            <section className={ classes.sectionContainer }>
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Featured Collection</h1>
                </div>

                <div className={ classes.cardContainer }>
                    <VerticalFocusedCard
                       avatar="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                       name="Dataset Name"
                       owner="praks"
                       numDatasets={ 25 }
                       type="images"
                    />

                    {
                        // TODO: Fix props on VerticalCard
                    }

                    {/* <VerticalCard
                       coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                       name="Dataset Name"
                       owner="praks"
                       numItems={ 12000 }
                       size={ 25 }
                       type="images"
                    /> */}

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
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Other Collection</h1>
                </div>

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
                <div className={ classes.headerContainer }>
                    <h1 className={ classes.header }>Trending in Segmentations</h1>
                </div>

                <div className={ classes.cardContainer }>
                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        updatedAt={ new Date() }
                        owner="praks"
                        numItems={ 12000 }
                        size={ 25 }
                        type="images"
                    />

                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        updatedAt={ new Date() }
                        numItems={ 12000 }
                        size={ 25 }
                        type="images"
                    />

                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        updatedAt={ new Date() }
                        numItems={ 12000 }
                        size={ 25 }
                        type="images"
                    />

                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        updatedAt={ new Date() }
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
            { page }
        </>
    );
};

export default Marketplace;
