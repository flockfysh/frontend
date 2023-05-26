import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/components/layout/MainLayout';
import { ReactSVG } from 'react-svg';

import classes from './styles.module.css';
import upload from '@/icons/main/upload.svg';
import cpu from '@/icons/main/cpu.svg';
import edit from '@/icons/main/edit-3.svg';
import list from '@/icons/main/list.svg';
import grid from '@/icons/main/grid.svg';
import logout from '@/icons/main/log-out.svg';
import trash from '@/icons/main/trash-2.svg';
import { CircleProgressBar } from '@/components/CircleProgressBar';
import { useState } from 'react';

const ListFakeData = [
  {
    fileName: 'DJI_20220913210758_0',
    createdAt: '01/01/2023',
    type: 'IMAGE',
    status: 'DONE',
    fileSize: '5.2MB',
    imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fsky-technology-wind-antenna-line-tower-power-line-mast-street-light-electricity-lighting-energy-current-light-fixture-strommast-transmission-tower-television-antenna-electronic-device-electrical-supply-electronics-accessory-overhead-power-line-1127138.jpg&f=1&nofb=1&ipt=377b0ad064e5d75a681d4607d2d05747be2a6d04cfb2ac08d98cde2ebfa269ff&ipo=images'
  },
  {
    fileName: 'DJI_20220913210758_0',
    createdAt: '01/01/2023',
    type: 'IMAGE',
    status: 'DONE',
    fileSize: '5.2MB',
    imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fsky-technology-wind-antenna-line-tower-power-line-mast-street-light-electricity-lighting-energy-current-light-fixture-strommast-transmission-tower-television-antenna-electronic-device-electrical-supply-electronics-accessory-overhead-power-line-1127138.jpg&f=1&nofb=1&ipt=377b0ad064e5d75a681d4607d2d05747be2a6d04cfb2ac08d98cde2ebfa269ff&ipo=images'
  },
  {
    fileName: 'DJI_20220913210758_0',
    createdAt: '01/01/2023',
    type: 'IMAGE',
    status: 'DONE',
    fileSize: '5.2MB',
    imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fsky-technology-wind-antenna-line-tower-power-line-mast-street-light-electricity-lighting-energy-current-light-fixture-strommast-transmission-tower-television-antenna-electronic-device-electrical-supply-electronics-accessory-overhead-power-line-1127138.jpg&f=1&nofb=1&ipt=377b0ad064e5d75a681d4607d2d05747be2a6d04cfb2ac08d98cde2ebfa269ff&ipo=images'
  },
  {
    fileName: 'DJI_20220913210758_0',
    createdAt: '01/01/2023',
    type: 'IMAGE',
    status: 'DONE',
    fileSize: '5.2MB',
    imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fsky-technology-wind-antenna-line-tower-power-line-mast-street-light-electricity-lighting-energy-current-light-fixture-strommast-transmission-tower-television-antenna-electronic-device-electrical-supply-electronics-accessory-overhead-power-line-1127138.jpg&f=1&nofb=1&ipt=377b0ad064e5d75a681d4607d2d05747be2a6d04cfb2ac08d98cde2ebfa269ff&ipo=images'
  },
  {
    fileName: 'DJI_20220913210758_0',
    createdAt: '01/01/2023',
    type: 'IMAGE',
    status: 'DONE',
    fileSize: '5.2MB',
    imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fsky-technology-wind-antenna-line-tower-power-line-mast-street-light-electricity-lighting-energy-current-light-fixture-strommast-transmission-tower-television-antenna-electronic-device-electrical-supply-electronics-accessory-overhead-power-line-1127138.jpg&f=1&nofb=1&ipt=377b0ad064e5d75a681d4607d2d05747be2a6d04cfb2ac08d98cde2ebfa269ff&ipo=images'
  },
  {
    fileName: 'DJI_20220913210758_0',
    createdAt: '01/01/2023',
    type: 'IMAGE',
    status: 'DONE',
    fileSize: '5.2MB',
    imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fsky-technology-wind-antenna-line-tower-power-line-mast-street-light-electricity-lighting-energy-current-light-fixture-strommast-transmission-tower-television-antenna-electronic-device-electrical-supply-electronics-accessory-overhead-power-line-1127138.jpg&f=1&nofb=1&ipt=377b0ad064e5d75a681d4607d2d05747be2a6d04cfb2ac08d98cde2ebfa269ff&ipo=images'
  },
  {
    fileName: 'DJI_20220913210758_0',
    createdAt: '01/01/2023',
    type: 'IMAGE',
    status: 'DONE',
    fileSize: '5.2MB',
    imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fsky-technology-wind-antenna-line-tower-power-line-mast-street-light-electricity-lighting-energy-current-light-fixture-strommast-transmission-tower-television-antenna-electronic-device-electrical-supply-electronics-accessory-overhead-power-line-1127138.jpg&f=1&nofb=1&ipt=377b0ad064e5d75a681d4607d2d05747be2a6d04cfb2ac08d98cde2ebfa269ff&ipo=images'
  },
  {
    fileName: 'DJI_20220913210758_0',
    createdAt: '01/01/2023',
    type: 'IMAGE',
    status: 'DONE',
    fileSize: '5.2MB',
    imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fsky-technology-wind-antenna-line-tower-power-line-mast-street-light-electricity-lighting-energy-current-light-fixture-strommast-transmission-tower-television-antenna-electronic-device-electrical-supply-electronics-accessory-overhead-power-line-1127138.jpg&f=1&nofb=1&ipt=377b0ad064e5d75a681d4607d2d05747be2a6d04cfb2ac08d98cde2ebfa269ff&ipo=images'
  }
];

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
  const [showList, setShowList] = useState(true);

  const toggleViewToList = () => {
    setShowList(true);
  };

  const toggleViewToGrid = () => {
    setShowList(false);
  };

  return (
    <div className={ classes.container }>
      {/* this dataset info */}
      <div className={ classes.datasetInfoWrapper }>

        {/* dataset data container */}
        <div className={ classes.datasetInfoDataWrapper }>
          <h3>DATASET NAME</h3>
          <h4>This is a dataset containing images of street</h4>
        </div>

        {/* dataset status container */}
        <div className={ classes.datasetInfoStatusWrapper }>

          {/* current progress */}
          <div>
            <CircleProgressBar value={ 50 } />
          </div>

          {/* specific progress data */}
          <div className={ classes.datasetInfoSpecificData }>
            {datasetProgressFakeData.map((item, index) => (
              <div key={ index } className={ classes.datasetInfoSpecificDataItem }>
                <span>{item.value}</span>
                <small>{item.label}</small>
              </div>
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
        <div className={ classes.tableWrapper }>

          <li className={ classes.rowHeader }>
            <span className={ classes.cell }><button><input type="checkbox" /></button></span>
            <span className={ classes.cell }>File Name</span>
            <span className={ classes.cell }>Created At</span>
            <span className={ classes.cell }>Type</span>
            <span className={ classes.cell }>Status</span>
            <span className={ classes.cell }>File Size</span>
            <span className={ classes.cell }></span>
          </li>
          <div className={ classes.bodyWrapper }>
            {ListFakeData.map((item, index) => (
              <li key={ `${index}-${item.fileName}` } className={ classes.row }>
                <span className={ `${classes.cell} ${classes.cellFirstChild}` }></span>
                <span className={ classes.cell }>{item.fileName}</span>
                <span className={ classes.cell }>{item.createdAt}</span>
                <span className={ classes.cell }>{item.type}</span>
                <span className={ classes.cell }>{item.status}</span>
                <span className={ classes.cell }>{item.fileSize}</span>
                <span className={ `${classes.cell} ${classes.cellLastChild}` }>
                  <ReactSVG className={ classes.icon } src={ trash.src } />
                </span>
              </li>
            ))}
          </div>
        </div>
      ) : (
          <div className={ classes.gridWrapper }>
            {ListFakeData.map((item, index) => (
              <div className={ classes.imageWrapper } key={ `${index}-${item.fileName}` }>
                <img src={ item.imgSrc } alt={ item.fileName } />
                <button className={ classes.imageButton }>
                  <ReactSVG className={ classes.icon } src={ trash.src } />
                </button>
              </div>
            ))}
          </div>
      )}


      {/* upload content */}
      <div className={ classes.uploadDataWrapper }>
        <ReactSVG className={ classes.uploadDataIcon } src={ upload.src } />
        <div className={ classes.uploadDataInfo }>
          <span>Drag and drop or select file to upload</span>
          <small>png, jpg, gif, mp4, mov, webm, pdf</small>
          <small>Stored on file system <i>question circle</i></small>
        </div>
      </div>
    </div>
  );
};

MyDatasets.getLayout = function (page) {
    return (
        <MainLayout>
            { page }
        </MainLayout>
    );
};

export default MyDatasets;
