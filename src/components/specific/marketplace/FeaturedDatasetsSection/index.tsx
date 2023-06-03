import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProfileCard from '@/components/specific/marketplace/profileCard';
import classes from './styles.module.css';
import { Carousel } from 'react-responsive-carousel';
import WideFocusedCard from '@/components/specific/marketplace/datasetCards/WideFocusedCard';
import { useMediaQuery } from '@/helpers/mediaQuery';
import React from 'react';

function FocusedDataset() {
    return (
        <div className={ classes.focusedDatasetSection }>
            <div className={ classes.focusedDatasetBackground }></div>
            <h1 className={ classes.title }>Blood Cell Images</h1>
            <div className={ classes.footer }>
                <div className={ classes.leftContainer }>
                    <div className={ classes.datasetHeaderInfoCard }>
                        <h2>Contributors</h2>

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
                        <h2>Total Images</h2>

                        <div className={ classes.infoCardBottomContainer }>
                            <p>450</p>
                        </div>
                    </div>

                    <div className={ classes.datasetHeaderInfoCard }>
                        <h2>Dataset Size</h2>

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
    );
}

export default function FeaturedDatasetsSection() {
    const mobileMatch = useMediaQuery('(min-width: 910px)');
    const intermediateMatch = useMediaQuery('(min-width: 1280px)');
    const largeMatch = useMediaQuery('(min-width: 1600px)');

    // Force recompute - a REALLY hacky way to refresh the carousel.
    const [_center, _setCenter] = React.useState(true);
    const [_transition, _setTransition] = React.useState<number | undefined>(undefined);
    React.useEffect(() => {
        if (!_center) {
            _setCenter(true);
        }
    }, [_center]);
    React.useEffect(() => {
        function resize() {
            _setTransition(0);
            setTimeout(() => {
                _setTransition(undefined);
            }, 50);
        }

        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);
    React.useEffect(() => {
        _setCenter(false);
    }, [mobileMatch, intermediateMatch, largeMatch]);
    
    return (
        <section className={ classes.headerContainer }>
            <FocusedDataset></FocusedDataset>
            <div className={ classes.featuredDatasetsContainer }>
                <Carousel centerMode={ _center } autoPlay={ true } interval={ 50000 }
                          centerSlidePercentage={ largeMatch ? 25 : intermediateMatch ? 33.3 : mobileMatch ? 50 : 100 }
                          showStatus={ false } infiniteLoop={ true } transitionTime={ _transition }
                          showIndicators={ false }
                          showThumbs={ false }
                          className={ classes.carousel }>
                    <div className={ classes.wideCardContainer }>
                        <WideFocusedCard
                            name="Sports Cars"
                            owner="praks"
                            numItems={ 450 }
                            size={ 45 }
                            type="images"
                            avatar="https://s3-alpha-sig.figma.com/img/f9ce/c075/6377d812bd68eca0f051288b2eddc4be?Expires=1686528000&Signature=TyhUr3tMgoUyhH-FBJPdRRuvmHfd~DXGH786WKVLFYs46xpvQRliGlYhDTg2LXqoLsBdGPJlCWkAz9v~PykCKkZSpRa4qiHMJMmaNlaceuGb-VU2p07uT6ZdcXQHjAwQnKshsskNhliyiUThZT4gcg9RVbIcHT9yYF-~q3VUAbTDouJTWIBf7I10LUzA6JJNnhoAVMmGrxQpG3JFukvOMahxRbPtf5duDX5tXCE-7y-Q~viDWXHtVDzHVeDedeE187lHSXBUA~RJC2mndjXvzp6Sq8QL9RD4qsOA~D-XhsDuCXCDDZAxpb80npW0eyNWGJ0u3-yK1Lb~CqgPj~r72w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        />
                    </div>
                    <div className={ classes.wideCardContainer }>
                        <WideFocusedCard
                            name="Sports Cars"
                            owner="praks"
                            numItems={ 450 }
                            size={ 45 }
                            type="images"
                            avatar="https://s3-alpha-sig.figma.com/img/f9ce/c075/6377d812bd68eca0f051288b2eddc4be?Expires=1686528000&Signature=TyhUr3tMgoUyhH-FBJPdRRuvmHfd~DXGH786WKVLFYs46xpvQRliGlYhDTg2LXqoLsBdGPJlCWkAz9v~PykCKkZSpRa4qiHMJMmaNlaceuGb-VU2p07uT6ZdcXQHjAwQnKshsskNhliyiUThZT4gcg9RVbIcHT9yYF-~q3VUAbTDouJTWIBf7I10LUzA6JJNnhoAVMmGrxQpG3JFukvOMahxRbPtf5duDX5tXCE-7y-Q~viDWXHtVDzHVeDedeE187lHSXBUA~RJC2mndjXvzp6Sq8QL9RD4qsOA~D-XhsDuCXCDDZAxpb80npW0eyNWGJ0u3-yK1Lb~CqgPj~r72w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        />
                    </div>
                    <div className={ classes.wideCardContainer }>
                        <WideFocusedCard
                            name="Sports Cars"
                            owner="praks"
                            numItems={ 450 }
                            size={ 45 }
                            type="images"
                            avatar="https://s3-alpha-sig.figma.com/img/f9ce/c075/6377d812bd68eca0f051288b2eddc4be?Expires=1686528000&Signature=TyhUr3tMgoUyhH-FBJPdRRuvmHfd~DXGH786WKVLFYs46xpvQRliGlYhDTg2LXqoLsBdGPJlCWkAz9v~PykCKkZSpRa4qiHMJMmaNlaceuGb-VU2p07uT6ZdcXQHjAwQnKshsskNhliyiUThZT4gcg9RVbIcHT9yYF-~q3VUAbTDouJTWIBf7I10LUzA6JJNnhoAVMmGrxQpG3JFukvOMahxRbPtf5duDX5tXCE-7y-Q~viDWXHtVDzHVeDedeE187lHSXBUA~RJC2mndjXvzp6Sq8QL9RD4qsOA~D-XhsDuCXCDDZAxpb80npW0eyNWGJ0u3-yK1Lb~CqgPj~r72w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
