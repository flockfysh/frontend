import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/router';

import CurrentUserProfile from '@/components/specific/marketplace/currentUserProfile';

import fish from '@/icons/branding/fish.svg';
import search from '@/icons/main/search.svg';
import bell from '@/icons/main/bell.svg';
import plusCircle from '@/icons/main/plus-circle.svg';

import classes from './styles.module.css';

export default function MarketplaceNavbar() {
    const { push } = useRouter();

    return (
        <nav className={ classes.nav }>
            <div className={ classes.subContainer + ' ' + classes.leftContainer }>
                <div className={ classes.logoContainer } onClick={ () => push('/marketplace') }>
                    <ReactSVG src={ fish.src } />

                    <p>fDE</p>
                </div>

                <label className={ classes.searchContainer }>
                    <ReactSVG src={ search.src } className={ classes.searchIcon }/>

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

                <CurrentUserProfile />
            </div>
        </nav>
    );
}
