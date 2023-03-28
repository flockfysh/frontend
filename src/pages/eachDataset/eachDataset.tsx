import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import SideBar from '../../components/dashboard/eachDataset/sideBar/sideBar';
import Overview from '../../components/dashboard/eachDataset/overview/overview';
import ImageBrowser from '../../components/dashboard/eachDataset/imageBrowser/imageBrowser';
import Settings from '../../components/dashboard/eachDataset/settings/settings';
import Loading from '../../components/loading/loading';

import Train from '../../components/dashboard/eachDataset/train/train';
import api from '../../helpers/api';
import classes from './eachDataset.module.css';
import Annotate from '../../components/dashboard/annotate/main/annotate';
import ProgressScreen, {
    ProgressScreenProps,
} from '../../components/dashboard/eachDataset/progressScreen/progressScreen';

async function getDataset(datasetId: string): Promise<Dataset> {
    const result = (await api.get(`/api/dataset/${datasetId}`)).data.data;
    const monthlyCost: MonthlyCost = {
        storage: 0,
        costs: [],
        creation: 0,
        total: 0,
    };

    monthlyCost.total = monthlyCost.storage + (monthlyCost.costs?.reduce((cPrev, c2) => {
        return cPrev + c2.amount;
    }, 0) ?? 0) + monthlyCost.creation;

    return {
        state: result.state,
        name: result.name,
        id: result.id,
        dateCreated: new Date(result.createdOn),
        plan: 'Free forever',
        classes: result.classes,
        numTimesHumanFeedback: result.numTimesHumanFeedback,
        monthlyCost: monthlyCost,
        entityInfo: result.entityInfo,
        description: result.description,
        numImages: result.itemCount,
    };
}


interface DatasetProgressObject {
    taskInProgress: boolean,
    taskInfo?: ProgressScreenProps,
}

async function getDatasetProgress(datasetId: string): Promise<DatasetProgressObject> {
    const state = (await api.get(`/api/dataset/${datasetId}/progress`)).data.data;
    const currentTaskInfo = state.result ?? state.info;

    const result: DatasetProgressObject = {
        taskInProgress: state.taskInProgress,
    };

    if (currentTaskInfo) {
        result.taskInfo = {
            current: currentTaskInfo.current,
            total: currentTaskInfo.total,
            description: currentTaskInfo.status,
            eta: currentTaskInfo.eta,
        };
    }

    console.log(datasetId, result);

    return result;
}

export default function EachDataset(props: { page: string }) {
    const { datasetId } = useParams();
    const navigate = useNavigate();
    const subPage = props.page;

    const [dataset, updateDataset] = useState<Dataset | undefined>();

    const [datasetProgressLoaded, setDatasetProgressLoaded] = React.useState(false);
    const [taskInProgress, setTaskInProgress] = React.useState(false);
    const [progressScreenProps, setProgressScreenProps] = React.useState<ProgressScreenProps | undefined>(undefined);

    React.useEffect(() => {
        if (!datasetId) {
            navigate('/dashboard');
            return;
        }

        async function refreshDatasetProgress() {
            if (!datasetId) throw new Error('Dataset ID not found.');
            const datasetProgressObject = await getDatasetProgress(datasetId);
            setProgressScreenProps(datasetProgressObject.taskInfo);
            setTaskInProgress(datasetProgressObject.taskInProgress);
            setDatasetProgressLoaded(true);
        }

        refreshDatasetProgress().then();
        const interval = setInterval(refreshDatasetProgress, 5000);

        return () => clearInterval(interval);
    }, [datasetId, datasetProgressLoaded]);


    React.useEffect(() => {
        setDatasetProgressLoaded(false);
        if (!datasetId) {
            navigate('/dashboard');
            return;
        }

        function refreshDataset() {
            if (!datasetId) throw new Error('Dataset ID not found.');
            getDataset(datasetId).then(dataset => updateDataset(dataset));
        }

        refreshDataset();
        const interval = setInterval(refreshDataset, 5000);

        return () => clearInterval(interval);
    }, [datasetId]);

    if (!dataset || !datasetProgressLoaded) return <Loading/>;

    function guardElement(element: JSX.Element): JSX.Element {
        if (taskInProgress && progressScreenProps) {
            return <ProgressScreen { ...progressScreenProps }/>;
        }
        return element;
    }

    const pages: Record<string, JSX.Element> = {
        'overview': <Overview dataset={ dataset }/>,
        'annotate': guardElement(<Annotate></Annotate>),
        'train': guardElement(<Train dataset={ dataset } setTaskInProgress={ setTaskInProgress }
                                     setProgressScreenProps={ setProgressScreenProps }></Train>),
        'settings': <Settings dataset={ dataset }></Settings>,
        'uploaded-images':
            <ImageBrowser type={ 'uploaded' } dataset={ dataset }/>,
        'feedback-images':
            guardElement(<ImageBrowser type={ 'feedback' } dataset={ dataset }/>),
        'dataset-images':
            <ImageBrowser type={ 'completed' } dataset={ dataset }/>,
    };

    for (const key in pages) {
        const element = pages[key];
        if (element && typeof element === 'object') {
            pages[key] = React.cloneElement(element, { key });
        }
    }
    const element = pages[subPage];
    return (
        <div className={ classes.eachDatasetContainer }>
            <SideBar name={ dataset.name } page={ subPage } dataset={ dataset }>
                {element}
            </SideBar>
        </div>
    );
}
