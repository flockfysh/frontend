import { useState, useContext } from 'react';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';

import CurrentUserProfile from '@/components/specific/marketplace/currentUserProfile';
import CreateDatasetModal from '../createDatasetModal';

import Login from '../../login';

import { UserContext } from '@/contexts/userContext';

import fish from '@/icons/branding/fish.svg';
import search from '@/icons/main/search.svg';
import plusCircle from '@/icons/main/plus-circle.svg';
import userIcon from '@/icons/main/user.svg';

import classes from './styles.module.css';
import BellNotification from '../notifications/bell';

export default function MarketplaceNavbar() {
  const { user } = useContext(UserContext);

  const [isLogin, updateLogin] = useState(false);
  const [isModalOpen, updateModalOpen] = useState(false);


  return (
    <nav className={ classes.nav }>
      { isModalOpen && (
        <CreateDatasetModal onClose={ () => updateModalOpen(false) } />
      ) }

      { isLogin && <Login mode="login" onClose={ () => updateLogin(false) } /> }

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
              onClick={ () => updateModalOpen(true) }
              src={ plusCircle.src }
              className={ classes.leftIcon }
            />

          <BellNotification/>

            <CurrentUserProfile />
          </>
        ) : (
          <button
            className={ classes.loginButton }
            onClick={ () => updateLogin(true) }
          >
            Login <ReactSVG className={ classes.loginIcon } src={ userIcon.src } />
          </button>
        ) }
      </div>
    </nav>
  );
}
