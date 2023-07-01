import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';

import CurrentUserProfile from '@/components/specific/marketplace/currentUserProfile';
import CreateDatasetModal from '../createDatasetModal';

import fish from '@/icons/branding/fish.svg';
import search from '@/icons/main/search.svg';
import bell from '@/icons/main/bell.svg';
import plusCircle from '@/icons/main/plus-circle.svg';

import classes from './styles.module.css';

export default function MarketplaceNavbar() {
    const [isModalOpen, updateModalOpen] = useState(false);

    return (
        <nav className={ classes.nav }>
            { isModalOpen && (
                <CreateDatasetModal onClose={ () => updateModalOpen(false) } />
            ) }

            <div className={ classes.subContainer + ' ' + classes.leftContainer }>
                <Link className={ classes.logoContainer } href="/marketplace">
                    <ReactSVG src={ fish.src } />

                    <p>fDE</p>
                </Link>

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
                <ReactSVG
                    onClick={ () => updateModalOpen(true) }
                    src={ plusCircle.src }
                    className={ classes.leftIcon }
                />
                <ReactSVG src={ bell.src } className={ classes.leftIcon } />

                <CurrentUserProfile />
            </div>
        </nav>
    );
}
