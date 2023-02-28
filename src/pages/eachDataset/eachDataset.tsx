import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import SideBar from '../../components/dashboard/eachDataset/sideBar/sideBar';
import Overview from '../../components/dashboard/eachDataset/overview/overview';
import UploadedImages from '../../components/dashboard/eachDataset/uploadedImages/uploadedImages';
import DatasetImages from '../../components/dashboard/eachDataset/datasetImages/datasetImages';
import Settings from '../../components/dashboard/eachDataset/settings/settings';
import Loading from '../../components/loading/loading';

import Train from '../../components/dashboard/eachDataset/train/train';
import FeedbackImages from '../../components/dashboard/eachDataset/feedbackImages/feedbackImages';

import api from '../../helpers/api';

import classes from './eachDataset.module.css';
import Annotate from '../../components/dashboard/annotate/main/annotate';

export default function EachDataSet(props: { page: string }) {
    const { datasetId } = useParams();

    const [dummy, updateState] = useState(null as any);
    const forceUpdate = useCallback(() => updateState({}), []);
    
    const [dataset, updateDataset] = useState({} as Dataset);
    const [loading, updateLoading] = useState(true);

    const subPage = props.page;

    useEffect(() => {
        updateLoading(true);

        (async function () {
            // fetch dataset here
            try {
                const result = (await api.get(`/api/dataset/${ datasetId }`)).data.data;
                console.log(result);
                const monthlyCost: MonthlyCost = {
                    storage: 0,
                    costs: [],
                    creation: 0,
                    total: 0,
                };
    
                monthlyCost.total = monthlyCost.storage + (monthlyCost.costs?.reduce((cPrev, c2) => {
                    return cPrev + c2.amount;
                }, 0) ?? 0) + monthlyCost.creation;
    
                const dataset: Dataset = {
                    state: result.state,
                    name: result.name,
                    id: result.id,
                    dateCreated: new Date(result.createdOn),
                    plan: 'Free forever',
                    classes: result.classes,
                    numTimesHumanFeedback: result.numTimesHumanFeedback,
                    datasetImages: [],
                    uploadedImages: result.uploadedImages,
                    feedbackImages: result.feedbackImages,
                    completedImages: result.completedImages,
                    monthlyCost: monthlyCost,
                    size: result.size,
                    description: result.description,
                    numImages: result.itemCount,
                };
                updateDataset(dataset);
                updateLoading(false);
            }
            catch(error) {

            }
        })();
    }, [dummy]);


    if (loading) return <Loading/>;

    return (
        <div className={ classes.eachDatasetContainer }>
            <SideBar name={ dataset.name } page={ subPage }>
                {subPage === 'overview' && <Overview dataset={ dataset } />}

                {subPage === 'uploaded-images' && <UploadedImages dataset={ dataset } forceUpdate={ forceUpdate } />}
                {subPage === 'dataset-images' && <DatasetImages dataset={ dataset } forceUpdate={ forceUpdate } />}
                {subPage === 'feedback-images' && <FeedbackImages dataset={ dataset } forceUpdate={ forceUpdate } />}
                {subPage === 'annotate' && <Annotate/>}

                {subPage === 'settings' && <Settings dataset={ dataset } />}
                {subPage === 'train' && <Train dataset={ dataset } />}
            </SideBar>


        </div>
    );
}
