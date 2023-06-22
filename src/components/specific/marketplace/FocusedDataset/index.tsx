import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProfileCard from '@/components/specific/marketplace/ProfileCard';
import classes from './styles.module.css';
import { Carousel } from 'react-responsive-carousel';
import WideFocusedCard from '@/components/specific/marketplace/datasetCards/WideFocusedCard';
import { useMediaQuery } from '@/helpers/mediaQuery';
import React from 'react';
import { formatFileSize } from '@/helpers/formatting';

export default function FocusedDataset(props: HomepageDataset) {
    return (
        <div className={ classes.focusedDatasetSection }>
            <img className={ classes.focusedDatasetBackground }
                 src={ 'https://s3-alpha-sig.figma.com/img/f047/4a98/8b4d07ab312672f12d10b21fec40327c?Expires=1687737600&Signature=qHIX10Eb9MJf3iZOWiJZ8vsQ003vAaoSmRJQ3Uc49mHCZ5ZpDqHbyMDucJo0KG7afWq2El18GuwiyojHjfaExSHMybwUNqksO~YO2C5FCZoVdzt9j0Lyak4-zA840nJDyWsdh21O85b9PTMSVq2vTcR9rGcO22Ogb-w0Iy3JIbdGm3cVbwOo5JScjvLWwwdBaLJ9qyrSvQ60ldOM9DhBcia9Te1eQX7iS7jJIdF6fTV96XIbOCqp6pNQJzvNWVETibnvYJbP4jXon-C0fdWHsjhrrQw3mcUu59s38W7Kcbe1QJyFqwg-1w8Riro7K3Z1TiKEi3D4~ZcTgdhsQNwhKQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' }></img>
            <h1 className={ classes.title }>{props.name}</h1>
            <div className={ classes.footer }>
                <div className={ classes.leftContainer }>
                    {/*<div className={ classes.datasetHeaderInfoCard }>*/}
                    {/*    <h2>Contributors</h2>*/}

                    {/*    <div className={ classes.infoCardBottomContainer }>*/}
                    {/*        <p>75</p>*/}

                    {/*        <div className={ classes.profilePicContainer }>*/}
                    {/*            <div>*/}
                    {/*                <img*/}
                    {/*                    src="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"*/}
                    {/*                    alt="pfp"/>*/}
                    {/*            </div>*/}

                    {/*            <div>*/}
                    {/*                <img*/}
                    {/*                    src="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"*/}
                    {/*                    alt="pfp"/>*/}
                    {/*            </div>*/}

                    {/*            <div>*/}
                    {/*                <img*/}
                    {/*                    src="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"*/}
                    {/*                    alt="pfp"/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={ classes.datasetHeaderInfoCard }>
                        <h2>Total Images</h2>

                        <div className={ classes.infoCardBottomContainer }>
                            <p>{props.assetCounts.total}</p>
                        </div>
                    </div>

                    <div className={ classes.datasetHeaderInfoCard }>
                        <h2>Dataset Size</h2>

                        <div className={ classes.infoCardBottomContainer }>
                            <p>{formatFileSize(props.size.total.total)}</p>
                        </div>
                    </div>
                </div>

                <div className={ classes.rightContainer }>
                    <ProfileCard
                        profilePicture={ props.user.profilePhoto ?? '' }
                        username={ props.user.username }/>
                </div>
            </div>
        </div>
    );
}
