import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactSVG } from 'react-svg';
import DataTable, { Media, TableColumn } from 'react-data-table-component';
import dayjs from 'dayjs';
import MainLayout from '@/components/layout/MainLayout';
import { CircleProgressBar } from '@/components/specific/datasets/viewDataset/CircleProgressBar';
import SpecificProgressData from '@/components/specific/datasets/viewDataset/SpecificProgressData';
import FileUploader from '@/components/specific/datasets/viewDataset/FileUploader';

import cpu from '@/icons/main/cpu.svg';
import edit from '@/icons/main/edit-3.svg';
import list from '@/icons/main/list.svg';
import grid from '@/icons/main/grid.svg';
import logout from '@/icons/main/log-out.svg';
import trash from '@/icons/main/trash-2.svg';

import { capitalize } from '@/helpers/strings';
import { formatFileSize } from '@/helpers/formatting';

import classes from './styles.module.css';
import api from '@/helpers/api';

type PopulatedDataset = Flockfysh.Dataset & {
    size: Flockfysh.DatasetSize,
    assetCounts: Flockfysh.DatasetAssetCounts
};

const datasetProgressFakeData = [
    {
        value: '21,656 / 25000',
        label: 'Image Annotated'
    },
    {
        value: '6 hours ago',
        label: 'Latest Updated'
    },
    {
        value: '600',
        label: 'Awaiting Feedback'
    },
    {
        value: '25 GB',
        label: 'Dataset Size'
    },
    {
        value: '350K',
        label: 'Annotations'
    },
    {
        value: '2000',
        label: 'Training Completed'
    }
];

const MyDatasets: NextPageWithLayout = function () {


    const router = useRouter();
    const [showList, setShowList] = useState(true);
    const [dataset, setDataset] = React.useState<PopulatedDataset | undefined>();

    React.useEffect(() => {
        async function load() {
            const datasetId = router.query.datasetId;

            if (typeof datasetId !== 'string') {
                return;
            }
            const result = (await api.get<Api.Response<PopulatedDataset>>(`/api/datasets/${datasetId}`, {
                params: {
                    expand: 'size,assetCounts'
                }
            })).data.data;
            setDataset(result);
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

    return (
        <div className={ classes.container }>
            {/* this dataset info */}
            <div className={ classes.datasetInfoWrapper }>
                {/* dataset data container */}
                <div className={ classes.datasetInfoDataWrapper }>
                    <h3 className={ classes.datasetName }>DATASET NAME</h3>
                    <h4>This is a dataset containing images of street</h4>
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
                    <input type="search" placeholder="Search"/>
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
            {<AssetViewer showList={ showList } datasetId={ router.query.datasetId }></AssetViewer>}

            {/* upload content */}
            <FileUploader datasetId={ router.query.datasetId }/>
        </div>
    );
};

interface AssetViewerState {
    currentPage: number;
    currentRowsPerPage: number;
    totalExpectedAssets: number;
    assets: Map<string, Flockfysh.Asset>;
    lastId: string | undefined;
}


export function AssetViewer(props: {
    datasetId: string;
    showList: boolean;
}) {
    const initialState = (): AssetViewerState => {
        return {
            assets: new Map(),
            currentRowsPerPage: 10,
            totalExpectedAssets: Infinity,
            currentPage: 1,
            lastId: undefined,
        };
    };

    const [state, setState] = React.useState<AssetViewerState>(initialState);
    const [currentLoadController, setCurrentLoadController] = React.useState<AbortController | undefined>();

    async function delAsset(id: string) {
    }

    const columns: TableColumn<Flockfysh.Asset>[] = [
        {
            name: <input type={ 'checkbox' }/>,
            cell: () => <input type={ 'checkbox' }/>,
            grow: 0,
            width: '50px',
        },
        {
            name: 'File name',
            cell: (data) => (
                <span className={ classes.filename }>
                    <span className={ classes.filenameText }>{data.displayName}</span>
                </span>
            ),
            minWidth: '5rem',
        },
        {
            name: 'Uploaded at',
            cell: (data) => <span>{dayjs(data.uploadedAt).format('DD/MM/YYYY')}</span>,
            grow: 0,
            hide: Media.MD,
            width: '7rem'
        },
        {
            name: 'Type',
            cell: (data) => <span>{capitalize(data.type)}</span>,
            style: {
                position: 'static',
            },
            grow: 0,
            width: '5rem',
        },
        {
            name: 'Status',
            cell: (data) => <span>{capitalize(data.stage)}</span>,
            grow: 0,
        },
        {
            name: 'Size',
            cell: (data) => <span>{formatFileSize(data.size)}</span>,
            grow: 0,
        },
        {
            cell: (data) => (
                <button onClick={ () => delAsset(data._id) } className={ classes.deleteButton }>
                    <ReactSVG className={ classes.icon } src={ trash.src }/>
                </button>
            ),
            grow: 0,
            width: '3rem',
        },
    ];

    async function load(numItems: number = 20) {
        if (currentLoadController) {
            currentLoadController.abort();
        }
        const datasetId = props.datasetId;
        const abortController = new AbortController();
        setCurrentLoadController(abortController);
        const result = (await api.get<Api.Response<Flockfysh.Asset[]>>(`/api/datasets/${datasetId}/assets`, {
            params: {
                lessThan: state.lastId,
                limit: numItems,
            },
            signal: abortController.signal,
        })).data.data;
        for (const item of result) {
            state.assets.set(item._id, item);
        }
        setState((prev) => {
            return {
                ...prev,
                lastId: result[result.length - 1]?._id,
                assets: state.assets,
            };
        });
        setCurrentLoadController(undefined);
    }

    React.useEffect(() => {
        setState(initialState);
    }, [props.datasetId]);

    React.useEffect(() => {
        if (!currentLoadController && slice.length === 0 && state.assets.size > 0) {
            setState((currentState) => {
                return {
                    ...currentState,
                    currentPage: Math.ceil(currentState.assets.size / currentState.currentRowsPerPage),
                };
            });
        }
    }, [currentLoadController]);

    React.useEffect(() => {
        const expectedLengthOfAssets = state.currentPage * state.currentRowsPerPage;
        if (expectedLengthOfAssets > state.assets.size) {
            load(expectedLengthOfAssets - state.assets.size).then();
        }
    }, [state.assets.size, state.currentPage, state.currentRowsPerPage]);

    const slicePositions = [state.currentPage - 1, state.currentPage].map(pos => pos * state.currentRowsPerPage);
    const slice = Array.from(state.assets.values()).slice(...slicePositions);

    if (!props.showList) {
        return (
            <div className={ classes.gridWrapper }>
                {Array.from(state.assets.values()).map((item, index) => (
                    <div className={ classes.imageWrapper } key={ `${index}-${item.displayName}` }>
                        <img src={ item.url } alt={ item.displayName }/>

                        <button className={ classes.imageButton }>
                            <ReactSVG className={ classes.icon } src={ trash.src }/>
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={ classes.tableContainer }>
            <DataTable
                data={ slice }
                columns={ columns }
                fixedHeader={ true }
                responsive={ true }
                className={ classes.table }
                onChangePage={ (page) => {
                    setState((prev) => {
                        return {
                            ...prev,
                            currentPage: page,
                        };
                    });
                } }
                progressComponent={ <div/> }
                progressPending={ !!currentLoadController }
                onChangeRowsPerPage={ (currentRowsPerPage, currentPage) => {
                    setState((prev) => {
                        return {
                            ...prev,
                            currentPage: currentPage,
                            currentRowsPerPage: currentRowsPerPage,
                        };
                    });
                } }
                paginationDefaultPage={ state.currentPage }
                paginationResetDefaultPage={ true }
                persistTableHead={ true }
                pagination={ true }
                paginationTotalRows={ Math.ceil(state.totalExpectedAssets / state.currentRowsPerPage) }
                paginationPerPage={ state.currentRowsPerPage }
                paginationServer={ true }

                paginationServerOptions={ {
                    persistSelectedOnPageChange: true,
                    persistSelectedOnSort: true,
                } }

            />
        </div>
    );
}

MyDatasets.getLayout = function (page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    );
};

export default MyDatasets;
