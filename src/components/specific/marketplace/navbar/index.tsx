import CurrentUserProfile from "@/components/specific/marketplace/currentUserProfile";
import searchIcon from "@/icons/main/search.svg";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import Login from "../../login";
import CreateDatasetModal from "../createDatasetModal";
import CreatePostModal from "../createPostModal";

import { UserContext } from "@/contexts/userContext";

import fish from "@/icons/branding/fish.svg";
import bell from "@/icons/main/bell.svg";
import penTool from "@/icons/main/pen-tool.svg";
import plusCircle from "@/icons/main/plus-circle.svg";
import userIcon from "@/icons/main/user.svg";

import { ModalContext } from "@/contexts/modalContext";
import api from "@/helpers/api";
import classes from "./styles.module.css";

export default function MarketplaceNavbar() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState<RedactedUser[]>([]);
  const [searchedDataset, setsearchedDataset] = useState<HomepageDataset[]>([]);

  const [isLogin, updateLogin] = useState(false);
  const [isDatasetModalOpen, updateDatasetModalOpen] = useState(false);
  const { isCreatePostOpen, setCreatePostOpen } = useContext(ModalContext);

  useEffect(() => {
    const fetchTimerId = setTimeout(async () => {
      if (search.length > 0) {
        const fetchedDataset = (
          await api.get<Api.PaginatedResponse<HomepageDataset[]>>(
            "/api/datasets/search",
            {
              params: {
                name: search,
              },
            }
          )
        ).data;

        const fetchedUsers = (
          await api.get<Api.PaginatedResponse<RedactedUser[]>>(
            "/api/users/search",
            {
              params: {
                query: search,
              },
            }
          )
        ).data;

        setsearchedDataset(fetchedDataset.data);
        setSearchedUser(fetchedUsers.data);

        setOpen(true);
      } else {
        setOpen(false);
      }
    }, 2000);

    return () => clearTimeout(fetchTimerId);
  }, [search]);

  console.log(search, open);

  return (
    <nav className={classes.nav}>
      {isDatasetModalOpen && (
        <CreateDatasetModal onClose={() => updateDatasetModalOpen(false)} />
      )}

      {isCreatePostOpen && (
        <CreatePostModal onClose={() => setCreatePostOpen(false)} />
      )}

      {isLogin && <Login mode='login' onClose={() => updateLogin(false)} />}

      <div className={classes.subContainer + " " + classes.leftContainer}>
        <Link className={classes.logoContainer} href='/marketplace'>
          <ReactSVG src={fish.src} />

          <p>fDE</p>
        </Link>

        <label
          className={classes.searchContainer}
          onBlur={() => {
            setOpen(false);
          }}
          onFocus={() => {
            setOpen(true);
          }}
        >
          <ReactSVG src={searchIcon.src} className={classes.searchIcon} />

          <input
            type='search'
            className={classes.search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder='Search by username or dataset name'
          />
          <div
            id='menu-div'
            className={`${classes.searchResult} ${
              open ? classes.searchResultActive : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {searchedUser.length > 0 && (
              <>
                <h2 className={classes.searchResultHeader}>Users</h2>
                {searchedUser.slice(0, 3).map((user, userIndex) => {
                  return (
                    <Link
                      href={user.link}
                      key={userIndex}
                      className={classes.searchResultItem}
                    >
                      {user.name}
                    </Link>
                  );
                })}
              </>
            )}

            {searchedDataset.length > 0 && (
              <>
                <h2 className={classes.searchResultHeader}>Datasets</h2>
                {searchedDataset.slice(0, 3).map((dataset, datasetIndex) => {
                  return (
                    <Link
                      href={dataset.link}
                      key={datasetIndex}
                      className={classes.searchResultItem}
                    >
                      {dataset.name}
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </label>

        <ReactSVG src={searchIcon.src} className={classes.mobileSearch} />
      </div>

      <div className={classes.subContainer}>
        {user ? (
          <>
            <ReactSVG
              onClick={() => setCreatePostOpen(true)}
              src={penTool.src}
              className={classes.leftIcon}
            />
            <ReactSVG
              onClick={() => updateDatasetModalOpen(true)}
              src={plusCircle.src}
              className={classes.leftIcon}
            />
            <ReactSVG src={bell.src} className={classes.leftIcon} />

            <CurrentUserProfile showMenu={true} />
          </>
        ) : (
          <button
            className={classes.loginButton}
            onClick={() => updateLogin(true)}
          >
            Login <ReactSVG className={classes.loginIcon} src={userIcon.src} />
          </button>
        )}
      </div>
    </nav>
  );
}
