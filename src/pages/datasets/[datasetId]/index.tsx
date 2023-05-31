import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactSVG } from 'react-svg';
import DataTable, { Media, TableColumn } from 'react-data-table-component';

import { v4 } from 'uuid';
import dayjs from 'dayjs';
import { z } from 'zod';

import MainLayout from '@/components/layout/MainLayout';
import { CircleProgressBar } from '@/components/specific/datasets/viewDataset/circleProgressBar';
import SpecificProgressData from '@/components/specific/datasets/viewDataset/specificProgressData';
import FileUploader from '@/components/specific/datasets/viewDataset/fileUploader';

import help from '@/icons/main/help-circle.svg';
import upload from '@/icons/main/upload.svg';
import cpu from '@/icons/main/cpu.svg';
import edit from '@/icons/main/edit-3.svg';
import list from '@/icons/main/list.svg';
import grid from '@/icons/main/grid.svg';
import logout from '@/icons/main/log-out.svg';
import trash from '@/icons/main/trash-2.svg';

import { capitalize } from '@/helpers/strings';
import { formatFileSize } from '@/helpers/formatting';

import classes from './styles.module.css';

const datasetId = v4();
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

const MyDatasets: NextPageWithLayout = function() {
    const router = useRouter();
    const datasetId = z.string().parse(router.query.datasetId);
    const [showList, setShowList] = useState(true);

    const toggleViewToList = () => {
        setShowList(true);
    };

    const toggleViewToGrid = () => {
        setShowList(false);
    };

    async function delAsset(id: string) {
        console.log(id);
    }

    const columns: TableColumn<Asset>[] = [
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
            grow: 0,
            width: '5rem',
        },
        {
            name: 'Status',
            cell: (data) => <span>{capitalize(data.status)}</span>,
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

    const listData: Asset[] = Array.from({ length: 20 }, () => {
        return {
            _id: v4(),
            dataset: datasetId,
            displayName: 'DJI_20220913210758_0',
            uploadedAt: new Date(),
            type: 'image',
            status: 'uploaded',
            size: 1524030,
            url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fsky-technology-wind-antenna-line-tower-power-line-mast-street-light-electricity-lighting-energy-current-light-fixture-strommast-transmission-tower-television-antenna-electronic-device-electrical-supply-electronics-accessory-overhead-power-line-1127138.jpg&f=1&nofb=1&ipt=377b0ad064e5d75a681d4607d2d05747be2a6d04cfb2ac08d98cde2ebfa269ff&ipo=images'
        };
    });

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
                        <CircleProgressBar value={ 50 } size={ 150 } />
                    </div>

                    {/* specific progress data */}
                    <div className={ classes.datasetInfoSpecificData }>
                        {datasetProgressFakeData.map((item, index) => (
                            <SpecificProgressData { ...item } key={ index } />
                        ))}
                    </div>
                </div>
            </div>

            {/* action buttons & searchbar */}
            <div className={ classes.actionAreaWrapper }>

                {/* searchbar */}
                <div className={ classes.actionAreaSearchWrapper }>
                    <input type="search" placeholder="Search" />
                </div>

                {/* action functions */}
                <div className={ classes.actionAreaActionButtonsWrapper }>

                    {/* switch table style */}
                    <div className={ classes.tableRelatedButtonsWrapper }>
                        <div className={ classes.tableViewButtonsWrapper }>
                            <button onClick={ toggleViewToGrid }>
                                <ReactSVG className={ classes.icon } src={ grid.src } />
                            </button>

                            <div className={ classes.separator } />

                            <button onClick={ toggleViewToList }>
                                <ReactSVG className={ classes.icon } src={ list.src } />
                            </button>
                        </div>

                        <button className={ classes.outButton }>
                            <ReactSVG className={ classes.icon } src={ logout.src } />
                        </button>
                    </div>

                    {/* action button */}
                    <div className={ classes.actionButtonsWrapper }>
                        <button className={ classes.actionButtonInitiateTraining }>
                            Initiate Training
                            <ReactSVG className={ classes.icon } src={ cpu.src } />
                        </button>

                        <button className={ classes.actionButtonAnnotated }>
                            Annotated
                            <ReactSVG className={ classes.icon } src={ edit.src } />
                        </button>
                    </div>
                </div>

            </div>

            {/* list & grid */}
            {showList ? (
                <div className={ classes.tableContainer }>
                    <DataTable
                        data={ listData }
                        columns={ columns }
                        fixedHeader={ true }
                        responsive={ true }
                        className={ classes.table }
                    />
                </div>
            ) : (
                <div className={ classes.gridWrapper }>
                    {listData.map((item, index) => (
                        <div className={ classes.imageWrapper } key={ `${ index }-${ item.displayName }` }>
                            <img src={ item.url } alt={ item.displayName } />

                            <button className={ classes.imageButton }>
                                <ReactSVG className={ classes.icon } src={ trash.src } />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* upload content */}
            <FileUploader datasetId={ datasetId } />
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
