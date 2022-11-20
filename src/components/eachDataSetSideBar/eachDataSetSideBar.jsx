import { Link } from "react-router-dom";

import classes from "./eachDataSetSideBar.module.css";

export default function EachDataSetSideBar(props) {
    return (
        <nav className={ classes.eachDatasetSideContainer }>
            <h1>{ props.name } Dataset</h1>

            <ul>
                <Link to={ `/dataset/overview/?id=${ props.id }` } className={ props.page === "overview" ? classes.linkColored + " " + classes.link : classes.link }>
                    Overview
                </Link>

                <Link to={ `/dataset/uploaded-images/?id=${ props.id }` } className={ props.page === "uploaded-images" ? classes.linkColored + " " + classes.link : classes.link }>
                    Uploaded Images
                </Link>
                
                <Link to={ `/dataset/dataset-images/?id=${ props.id }` } className={ props.page === "dataset-images" ? classes.linkColored + " " + classes.link : classes.link }>
                    Dataset
                </Link>
            </ul>

            <button className={ classes.deleteButton }>
                Delete dataset
            </button>
        </nav>
    );
}