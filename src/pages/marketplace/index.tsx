import { NextPageWithLayout } from '@/pages/_app';
import MarketplaceNavbar from '@/components/specific/marketplace/navbar';
import VerticalCard from '@/components/specific/marketplace/datasetCards/verticalCard';
import VerticalFocusedCard from '@/components/specific/marketplace/datasetCards/verticalFocusedCard';
import classes from './styles.module.css';
import FeaturedDatasetsSection from '@/components/specific/marketplace/FeaturedDatasetsSection';

const Marketplace: NextPageWithLayout = function () {
    return (
        <div className={ classes.container }>
            <MarketplaceNavbar/>

            <FeaturedDatasetsSection></FeaturedDatasetsSection>

            <section className={ classes.sectionContainer }>
                <div className={ classes.trendingHeaderContainer }>
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

            <section className={ classes.sectionContainer }>
                <h1 className={ classes.header }>Premium Datasets</h1>

                <div className={ classes.cardContainer }>
                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numItems={ 12000 }
                        size={ 25 }
                        type="images"
                        isPaid={ true }
                        price={ 35.96 }
                    />

                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numItems={ 12000 }
                        size={ 25 }
                        type="images"
                        isPaid={ true }
                        price={ 35.96 }
                    />

                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numItems={ 12000 }
                        size={ 25 }
                        type="images"
                        isPaid={ true }
                        price={ 35.96 }
                    />

                    <VerticalCard
                        coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numItems={ 12000 }
                        size={ 25 }
                        type="images"
                        isPaid={ true }
                        price={ 35.96 }
                    />
                </div>
            </section>

            <section className={ classes.sectionContainer }>
                <h1 className={ classes.header }>Featured Collection</h1>

                <div className={ classes.cardContainer }>
                    <VerticalFocusedCard
                        avatar="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        name="Dataset Name"
                        owner="praks"
                        numDatasets={ 25 }
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
