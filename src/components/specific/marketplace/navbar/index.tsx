import { useState, useContext } from 'react';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';

import CurrentUserProfile from '@/components/specific/marketplace/currentUserProfile';
import CreateDatasetModal from '../createDatasetModal';
import CreatePostModal from '../createPostModal';
import Login from '../../login';

import { UserContext } from '@/contexts/userContext';

import fish from '@/icons/branding/fish.svg';
import search from '@/icons/main/search.svg';
import bell from '@/icons/main/bell.svg';
import plusCircle from '@/icons/main/plus-circle.svg';
import penTool from '@/icons/main/pen-tool.svg';
import userIcon from '@/icons/main/user.svg';

import classes from './styles.module.css';
import { ModalContext } from '@/contexts/modalContext';

export default function MarketplaceNavbar() {
    const { user } = useContext(UserContext);

    const [isLogin, updateLogin] = useState(false);
    const [isDatasetModalOpen, updateDatasetModalOpen] = useState(false);
    const { isCreatePostOpen, setCreatePostOpen } = useContext(ModalContext);

    return (
        <nav className={ classes.nav }>
            { isDatasetModalOpen && (
                <CreateDatasetModal onClose={ () => updateDatasetModalOpen(false) } />
            ) }
            
            { isCreatePostOpen && (
                <CreatePostModal onClose={ () => setCreatePostOpen(false) } />
            ) }

            { isLogin && (
                <Login mode="login" onClose={ () => updateLogin(false) } />
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
                { user ? (
                    <>
                        <ReactSVG
                            onClick={ () => setCreatePostOpen(true) }
                            src={ penTool.src }
                            className={ classes.leftIcon }
                        />
                        <ReactSVG
                            onClick={ () => updateDatasetModalOpen(true) }
                            src={ plusCircle.src }
                            className={ classes.leftIcon }
                        />
                        <ReactSVG src={ bell.src } className={ classes.leftIcon } />

                        <CurrentUserProfile showMenu={ true } />
                    </>
                ) : (
                    <button
                        className={ classes.loginButton }
                        onClick={ () => updateLogin(true) }
                    >
                        Login{ ' ' }
                        <ReactSVG
                            className={ classes.loginIcon }
                            src={ userIcon.src }
                        />
                    </button>
                ) }
            </div>
        </nav>
    );
}
