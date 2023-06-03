import { NextPageWithLayout } from '@/pages/_app';

import ProfileCard from '@/components/specific/marketplace/profileCard';
import MarketplaceNavbar from '@/components/specific/marketplace/navbar';

import WideFocusedCard from '@/components/specific/marketplace/datasetCards/wideFocusedCard';
import VerticalCard from '@/components/specific/marketplace/datasetCards/verticalCard';
import VerticalFocusedCard from '@/components/specific/marketplace/datasetCards/verticalFocusedCard';

import classes from './styles.module.css';

const Marketplace: NextPageWithLayout = function () {
    return (
        <div className={ classes.container }>
            <MarketplaceNavbar/>

            <section className={ classes.headerContainer }>
                <div className={ classes.focusedDatasetSection }>
                    <div className={ classes.focusedDatasetBackground }></div>
                    <div className={ classes.title }>Blood Cell Images</div>
                    <div className={ classes.footer }>
                        <div className={ classes.leftContainer }>
                            <div className={ classes.datasetHeaderInfoCard }>
                                <h1>Contributors</h1>

                                <div className={ classes.infoCardBottomContainer }>
                                    <p>75</p>

                                    <div className={ classes.profilePicContainer }>
                                        <div>
                                            <img
                                                src="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                                alt="pfp"/>
                                        </div>

                                        <div>
                                            <img
                                                src="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                                alt="pfp"/>
                                        </div>

                                        <div>
                                            <img
                                                src="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                                alt="pfp"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={ classes.datasetHeaderInfoCard }>
                                <h1>Total Images</h1>

                                <div className={ classes.infoCardBottomContainer }>
                                    <p>450</p>
                                </div>
                            </div>

                            <div className={ classes.datasetHeaderInfoCard }>
                                <h1>Dataset Size</h1>

                                <div className={ classes.infoCardBottomContainer }>
                                    <p>45 MB</p>
                                </div>
                            </div>
                        </div>

                        <div className={ classes.rightContainer }>
                            <ProfileCard
                                profilePicture="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                username="praks"/>
                        </div>
                    </div>
                </div>
                <div className={ classes.featuredDatasetsContainer }>
                    <WideFocusedCard
                        name="Sports Cars"
                        owner="praks"
                        numItems={ 450 }
                        size={ 45 }
                        type="images"
                        avatar="https://s3-alpha-sig.figma.com/img/f9ce/c075/6377d812bd68eca0f051288b2eddc4be?Expires=1686528000&Signature=TyhUr3tMgoUyhH-FBJPdRRuvmHfd~DXGH786WKVLFYs46xpvQRliGlYhDTg2LXqoLsBdGPJlCWkAz9v~PykCKkZSpRa4qiHMJMmaNlaceuGb-VU2p07uT6ZdcXQHjAwQnKshsskNhliyiUThZT4gcg9RVbIcHT9yYF-~q3VUAbTDouJTWIBf7I10LUzA6JJNnhoAVMmGrxQpG3JFukvOMahxRbPtf5duDX5tXCE-7y-Q~viDWXHtVDzHVeDedeE187lHSXBUA~RJC2mndjXvzp6Sq8QL9RD4qsOA~D-XhsDuCXCDDZAxpb80npW0eyNWGJ0u3-yK1Lb~CqgPj~r72w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    />

                    <WideFocusedCard
                        name="Sports Cars"
                        owner="praks"
                        numItems={ 450 }
                        size={ 45 }
                        type="images"
                        avatar="https://s3-alpha-sig.figma.com/img/f9ce/c075/6377d812bd68eca0f051288b2eddc4be?Expires=1686528000&Signature=TyhUr3tMgoUyhH-FBJPdRRuvmHfd~DXGH786WKVLFYs46xpvQRliGlYhDTg2LXqoLsBdGPJlCWkAz9v~PykCKkZSpRa4qiHMJMmaNlaceuGb-VU2p07uT6ZdcXQHjAwQnKshsskNhliyiUThZT4gcg9RVbIcHT9yYF-~q3VUAbTDouJTWIBf7I10LUzA6JJNnhoAVMmGrxQpG3JFukvOMahxRbPtf5duDX5tXCE-7y-Q~viDWXHtVDzHVeDedeE187lHSXBUA~RJC2mndjXvzp6Sq8QL9RD4qsOA~D-XhsDuCXCDDZAxpb80npW0eyNWGJ0u3-yK1Lb~CqgPj~r72w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    />

                    <WideFocusedCard
                        name="Sports Cars"
                        owner="praks"
                        numItems={ 450 }
                        size={ 45 }
                        type="images"
                        avatar="https://s3-alpha-sig.figma.com/img/f9ce/c075/6377d812bd68eca0f051288b2eddc4be?Expires=1686528000&Signature=TyhUr3tMgoUyhH-FBJPdRRuvmHfd~DXGH786WKVLFYs46xpvQRliGlYhDTg2LXqoLsBdGPJlCWkAz9v~PykCKkZSpRa4qiHMJMmaNlaceuGb-VU2p07uT6ZdcXQHjAwQnKshsskNhliyiUThZT4gcg9RVbIcHT9yYF-~q3VUAbTDouJTWIBf7I10LUzA6JJNnhoAVMmGrxQpG3JFukvOMahxRbPtf5duDX5tXCE-7y-Q~viDWXHtVDzHVeDedeE187lHSXBUA~RJC2mndjXvzp6Sq8QL9RD4qsOA~D-XhsDuCXCDDZAxpb80npW0eyNWGJ0u3-yK1Lb~CqgPj~r72w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    />
                </div>
            </section>


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
