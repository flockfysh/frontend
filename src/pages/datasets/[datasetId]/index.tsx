import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactSVG } from 'react-svg';
import MainLayout from '@/components/layout/MainLayout';
import { CircleProgressBar } from '@/components/specific/datasets/viewDataset/CircleProgressBar';
import SpecificProgressData from '@/components/specific/datasets/viewDataset/SpecificProgressData';
import FileUploader from '@/components/specific/datasets/viewDataset/FileUploader';
import cpu from '@/icons/main/cpu.svg';
import edit from '@/icons/main/edit-3.svg';
import list from '@/icons/main/list.svg';
import grid from '@/icons/main/grid.svg';
import logout from '@/icons/main/log-out.svg';
import classes from './styles.module.css';
import api from '@/helpers/api';
import AssetViewer from '@/components/specific/datasets/viewDataset/AssetViewer';
import { formatFileSize } from '@/helpers/formatting';
import { dayjs } from '@/helpers/date';

type PopulatedDataset = Flockfysh.Dataset & {
    size: Flockfysh.DatasetSize,
    assetCounts: Flockfysh.DatasetAssetCounts,
    annotationCounts: Flockfysh.DatasetAnnotationCounts,
};


const MyDatasets: NextPageWithLayout = function () {
    const router = useRouter();
    const [showList, setShowList] = useState(true);
    const [dataset, setDataset] = React.useState<PopulatedDataset | undefined>();
    const [currentNameQuery, setCurrentNameQuery] = React.useState('');

    React.useEffect(() => {
        async function load() {
            const datasetId = router.query.datasetId;

            if (typeof datasetId !== 'string') {
                return;
            }
            const result = (await api.get<Api.Response<PopulatedDataset>>(`/api/datasets/${datasetId}`, {
                params: {
                    expand: 'size,assetCounts,annotationCounts'
                }
            })).data.data;
            setDataset(result);
            await api.post(
                `/api/datasets/${datasetId}/metrics`,
                {
                    type: 'view',
                }
            );
        }

        load().then();

    }, [router.query.datasetId]);

    const toggleViewToList = () => {
        setShowList(true);
    };

    const toggleViewToGrid = () => {
        setShowList(false);
    };

    if (!dataset || typeof router.query.datasetId !== 'string') {
        return <></>;
    }

    const datasetProgressFakeData = [
        {
            value: `${dataset.assetCounts.byAnnotationStatus.annotated} / ${dataset.assetCounts.total}`,
            label: 'Image Annotated'
        },
        {
            value: `${dayjs(dataset.updatedAt).fromNow()}`,
            label: 'Latest Updated'
        },
        {
            value: `${dataset.assetCounts.byStage.feedback}`,
            label: 'Awaiting Feedback'
        },
        {
            value: `${formatFileSize(dataset.size.total.total)}`,
            label: 'Dataset Size'
        },
        {
            value: `${dataset.annotationCounts.total}`,
            label: 'Annotations'
        },
        {
            value: `${dataset.assetCounts.byStage.completed}`,
            label: 'Training Completed'
        }
    ];

    return (

        <div className={ classes.container }>
            {/* this dataset info */}
            <div className={ classes.datasetInfoWrapper }>
                {/* dataset data container */}
                <div className={ classes.datasetInfoDataWrapper }>
                    <h3 className={ classes.datasetName }>{dataset.name}</h3>
                    <h4>{dataset.description}</h4>
                </div>

                {/* dataset status container */}
                <div className={ classes.datasetInfoStatusWrapper }>

                    {/* current progress */}
                    <div>
                        <CircleProgressBar value={ 50 } size={ 150 }/>
                    </div>

                    {/* specific progress data */}
                    <div className={ classes.datasetInfoSpecificData }>
                        {datasetProgressFakeData.map((item, index) => (
                            <SpecificProgressData { ...item } key={ index }/>
                        ))}
                    </div>
                </div>
            </div>

            {/* action buttons & searchbar */}
            <div className={ classes.actionAreaWrapper }>

                {/* searchbar */}
                <div className={ classes.actionAreaSearchWrapper }>
                    <input type="search" placeholder="Search assets by regex" value={ currentNameQuery } onChange={ e => {
                        setCurrentNameQuery(e.currentTarget.value);
                    } }/>
                </div>

                {/* action functions */}
                <div className={ classes.actionAreaActionButtonsWrapper }>

                    {/* switch table style */}
                    <div className={ classes.tableRelatedButtonsWrapper }>
                        <div className={ classes.tableViewButtonsWrapper }>
                            <button onClick={ toggleViewToGrid }>
                                <ReactSVG className={ classes.icon } src={ grid.src }/>
                            </button>

                            <div className={ classes.separator }/>

                            <button onClick={ toggleViewToList }>
                                <ReactSVG className={ classes.icon } src={ list.src }/>
                            </button>
                        </div>

                        <button className={ classes.outButton }>
                            <ReactSVG className={ classes.icon } src={ logout.src }/>
                        </button>
                    </div>

                    {/* action button */}
                    <div className={ classes.actionButtonsWrapper }>
                        <button className={ classes.actionButtonInitiateTraining }>
                            Initiate Training
                            <ReactSVG className={ classes.icon } src={ cpu.src }/>
                        </button>

                        <button className={ classes.actionButtonAnnotated }>
                            Annotated
                            <ReactSVG className={ classes.icon } src={ edit.src }/>
                        </button>
                    </div>
                </div>

            </div>

            {/* list & grid */}
            {<AssetViewer showList={ showList } searchQuery={ {
                displayName: currentNameQuery || undefined,
            } }
                          datasetId={ router.query.datasetId }></AssetViewer>}

            {/* upload content */}
            <FileUploader datasetId={ router.query.datasetId } datasetType={ dataset.type }/>
        </div>
    );
};


MyDatasets.getLayout = function (page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    );
};

export default MyDatasets;
