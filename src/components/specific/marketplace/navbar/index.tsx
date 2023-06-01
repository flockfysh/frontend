import { ReactSVG } from 'react-svg';

import ProfileCard from '../profileCard';

import fish from '@/icons/branding/fish.svg';
import search from '@/icons/main/search.svg';
import bell from '@/icons/main/bell.svg';
import plusCircle from '@/icons/main/plus-circle.svg';

import classes from './styles.module.css';

export default function MarketplaceNavbar() {
    return (
        <nav className={ classes.nav }>
            <div className={ classes.subContainer + ' ' + classes.leftContainer }>
                <div className={ classes.logoContainer }>
                    <ReactSVG src={ fish.src } />

                    <p>fDE</p>                
                </div>

                <label className={ classes.searchContainer }>
                    <ReactSVG src={ search.src } className={ classes.searchIcon } />

                    <input
                        type="search"
                        className={ classes.search }
                        placeholder="Search by username or dataset name"
                    />
                </label>

                <ReactSVG src={ search.src } className={ classes.mobileSearch } />
            </div>

            <div className={ classes.subContainer }>
                <ReactSVG src={ plusCircle.src } className={ classes.leftIcon } />
                <ReactSVG src={ bell.src } className={ classes.leftIcon } />

                <ProfileCard profilePicture="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" username="praks" />
            </div>
        </nav>
    );
}
