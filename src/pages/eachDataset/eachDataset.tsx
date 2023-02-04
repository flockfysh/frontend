import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import SideBar from '../../components/dashboard/eachDataset/sideBar/sideBar';
import Overview from '../../components/dashboard/eachDataset/overview/overview';
import UploadedImages from '../../components/dashboard/eachDataset/uploadedImages/uploadedImages';
import Images from '../../components/dashboard/eachDataset/images/images';
import Settings from '../../components/dashboard/eachDataset/settings/settings';
import Loading from '../../components/loading/loading';

import classes from './eachDataset.module.css';
import api from '../../helpers/api';
import Train from '../../components/dashboard/eachDataset/train/train';

export default function EachDataSet(props: { page: string }) {
    const {datasetId} = useParams();

    const [dataset, updateDataset] = useState({} as Dataset);
    const [loading, updateLoading] = useState(true);

    const subPage = props.page;

    useEffect(() => {
        updateLoading(true);

        (async function () {
            // fetch dataset here
            const result = (await api.get(`/api/dataset/${datasetId}`)).data.data;
            const monthlyCost: MonthlyCost = {
                storage: 0,
                costs: [],
                creation: 0,
                total: 0
            };
            monthlyCost.total = monthlyCost.storage + (monthlyCost.costs?.reduce((cPrev, c2) => {
                return cPrev + c2.amount;
            }, 0) ?? 0) + monthlyCost.creation;
            const dataset: Dataset = {
                name: result.name,
                id: result.id,
                dateCreated: new Date(result.createdOn),
                plan: "Free forever",
                classes: result.classes,
                datasetImages: [],
                uploadedImages: result.uploadedImages,
                monthlyCost: monthlyCost,
                size: result.size,
                description: result.description,
                itemCount: result.itemCount,
            };
            console.log(dataset);
            updateDataset(dataset);
            updateLoading(false);
        })();
    }, []);
    if (loading) return <Loading/>;

    return (
        <div className={classes.eachDatasetContainer}>
            <SideBar name={dataset.name} page={subPage}>
                {subPage === 'overview' && <Overview dataset={dataset}/>}

                {subPage === 'uploaded-images' && <UploadedImages dataset={dataset}/>}

                {subPage === 'dataset-images' && <Images dataset={dataset}/>}

                {subPage === 'settings' && <Settings dataset={dataset}/>}

                {subPage === 'train' && <Train dataset={dataset}/>}
            </SideBar>


        </div>
    );
}
