import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SideBar from '../../components/dashboard/eachDataset/sideBar/sideBar';
import Overview from '../../components/dashboard/eachDataset/overview/overview';
import ImageBrowser from '../../components/dashboard/eachDataset/imageBrowser/imageBrowser';
import Settings from '../../components/dashboard/eachDataset/settings/settings';
import Loading from '../../components/loading/loading';

import Train from '../../components/dashboard/eachDataset/train/train';

import api from '../../helpers/api';

import classes from './eachDataset.module.css';
import Annotate from '../../components/dashboard/annotate/main/annotate';

export default function EachDataset(props: { page: string }) {
    const { datasetId } = useParams();

    const [dummy, updateState] = useState(null as any);
    const forceUpdate = useCallback(() => updateState({}), []);

    const [dataset, updateDataset] = useState<Dataset | undefined>();


    const subPage = props.page;

    useEffect(() => {
        (async function () {
            try {
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

                const dataset: Dataset = {
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
                updateDataset(dataset);
            }
 catch (error) {

            }
        })();
    }, [dummy]);


    if (!dataset) return <Loading/>;

    const pages: Record<string, JSX.Element> = {
        'overview': <Overview dataset={ dataset }/>,
        'annotate': <Annotate></Annotate>,
        'train': <Train dataset={ dataset }></Train>,
        'settings': <Settings dataset={ dataset }></Settings>,
        'uploaded-images':
            <ImageBrowser type={ 'uploaded' } dataset={ dataset }
                          forceUpdate={ forceUpdate }/>,
        'feedback-images':
            <ImageBrowser type={ 'feedback' } dataset={ dataset }
                          forceUpdate={ forceUpdate }/>,
        'dataset-images':
            <ImageBrowser type={ 'completed' } dataset={ dataset }
                          forceUpdate={ forceUpdate }/>,
    };
    const element = pages[subPage];
    return (
        <div className={ classes.eachDatasetContainer }>
            <SideBar name={ dataset.name } page={ subPage } dataset={ dataset }>
                {element}
            </SideBar>
        </div>
    );
}
