import { useEffect, useState } from "react";

import ViewDatasetsHeader from "../../components/viewDatasetsPage/viewDatasetsHeader/ViewDatasetsHeader";
import DatasetCard from "../../components/datasetCard/datasetCard";

import classes from "./viewDatasets.module.css";

export default function ViewDatasets() {
    const [datasets, updateDatasets] = useState(null);

    useEffect(() => {
        // fetch user datasets here

        let testDatasets = [];

        for(let i = 0; i < 6; i++) {
            testDatasets.push(
                {
                    name: 'Dogs',
                    id: 'ID',
                    numImages: 10,
                    overview: 'Lorem ipsum dolor sit amet, consectetur sed do eiusmod adipiscing elit, sed do eiusmod  ut aliquip ex ea sed do eiusmod commodo consequat.'
                }
            )
        }

        updateDatasets(
            testDatasets
        );
    });

    if(!datasets) return <>Loading...</>;

    return (
        <div className={ classes.viewDatasetsContainer }>
            <ViewDatasetsHeader />

            <h1 className={ classes.viewDatasetsHeader }>Your Datasets</h1>

            <div className={ classes.datasetsContainer }>
                { 
                    datasets.map(
                        (dataset, index) => <DatasetCard key={ index } dataset={ dataset } />
                    ) 
                }
            </div>
        </div>
    );
}