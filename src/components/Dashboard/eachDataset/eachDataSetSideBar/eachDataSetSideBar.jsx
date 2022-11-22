import { Link, useParams } from "react-router-dom";

import classes from "./eachDataSetSideBar.module.css";

export default function EachDataSetSideBar(props) {
   const { datasetName } = useParams();
   return (
      <nav className={classes.eachDatasetSideContainer}>
         <h1>{props.name} Dataset</h1>

         <ul>
            <Link
               to={`/dashboard/${datasetName}/overview`}
               className={
                  props.page === "overview"
                     ? classes.linkColored + " " + classes.link
                     : classes.link
               }>
               Overview
            </Link>

            <Link
               to={`/dashboard/${datasetName}/uploaded-images`}
               className={
                  props.page === "uploaded-images"
                     ? classes.linkColored + " " + classes.link
                     : classes.link
               }>
               Uploaded Images
            </Link>

            <Link
               to={`/dashboard/${datasetName}/dataset-images`}
               className={
                  props.page === "dataset-images"
                     ? classes.linkColored + " " + classes.link
                     : classes.link
               }>
               Dataset
            </Link>
         </ul>

         <button className={classes.deleteButton}>Delete dataset</button>
      </nav>
   );
}
