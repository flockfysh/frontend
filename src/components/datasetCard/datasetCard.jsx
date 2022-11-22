import LinkUnderline from "../UI/link/Link";

import classes from "./datasetCard.module.css";

export default function DatasetCard(props) {
    return (
        <div className={ classes.datasetContainer }>
            <div className={ classes.cardContainer }>
                <div className={ classes.trashIcon }>Trash</div>

                <h1>{ props.dataset.name } dataset</h1>

                <p className={ classes.overview }>{ props.dataset.overview }</p>

                <div className={ classes.cardBottom }>
                    <LinkUnderline to={ `/dashboard/dataset/overview/?id=${ props.dataset.id }` } text="View dataset" />

                    <h4>{ props.dataset.numImages } Images</h4>
                </div>
            </div>
        </div>
    );
}