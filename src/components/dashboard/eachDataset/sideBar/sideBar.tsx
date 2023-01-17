import {Link, useParams} from 'react-router-dom';
import React, {PropsWithChildren} from "react";
import classes from './sideBar.module.css';
import {RxHamburgerMenu} from 'react-icons/rx';
import {ScreenContext} from "../../../../contexts/screenContext";

const LINK_DESCRIPTIONS = [
    {
        name: "overview",
        children: "Overview",
    },
    {
        name: "uploaded-images",
        children: "Uploaded images",
    },
    {
        name: "dataset-images",
        children: "Dataset images",
    },
    {
        name: "settings",
        children: "Settings",
    }
];


export default function SideBar(props: PropsWithChildren<{ name: string; page: string }>) {
    const {datasetId} = useParams();
    const [mobileShown, setMobileShown] = React.useState(false);
    const {windowTooSmall} = React.useContext(ScreenContext);

    const mobileShownClassName = mobileShown ? "" : classes.hidden;
    if (!windowTooSmall && mobileShown) {
        setMobileShown(false);
    }

    const links = LINK_DESCRIPTIONS.map(link => {
        return {
            ...link,
            to: `/dashboard/${datasetId}/${link.name}`,
        };
    });

    return (
        <div className={classes.navOverlay}>
            <nav className={classes.primaryBar}>
                <button className={classes.toggleMobileMenuButton} onClick={() => {
                    setMobileShown(!mobileShown);
                }}>
                    <RxHamburgerMenu/>
                </button>
                <h1>{props.name} Dataset</h1>
                <div className={classes.desktopEachDatasetLinks}>
                    {links.map(link => {
                        return <Link
                            to={link.to}
                            className={
                                `${props.page === link.name ? classes.linkColored : ""} ${classes.link}`
                            }
                            key={link.to}>
                            {link.children}
                        </Link>;
                    })}
                </div>
            </nav>
            <div className={classes.mainContainer}>
                <div className={`${classes.mobileSidebarOverlay} ${mobileShownClassName}`} onClick={(e) => {
                    if (e.target === e.currentTarget) setMobileShown(false);
                }}>
                    <div className={`${classes.mobileSidebar} ${mobileShownClassName}`}>
                        {links.map(link => <Link
                            to={link.to}
                            className={
                                `${props.page === link.name ? classes.linkColored : ""} ${classes.link}`
                            }
                            key={link.to}>
                            {link.children}
                        </Link>)}
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    );
}
