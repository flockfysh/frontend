import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SideBar from '../../components/dashboard/eachDataset/sideBar/sideBar';
import Overview from '../../components/dashboard/eachDataset/overview/overview';
import UploadedImages from '../../components/dashboard/eachDataset/uploadedImages/uploadedImages';
import Images from '../../components/dashboard/eachDataset/images/images';
import Settings from '../../components/dashboard/eachDataset/settings/settings';
import Loading from '../../components/loading/loading';

import classes from './eachDataset.module.css';

export default function EachDataSet(props: { page: string }) {
  const { datasetId } = useParams();

  const [dataset, updateDataset] = useState({} as Dataset);
  const [loading, updateLoading] = useState(true);

  const subPage = props.page;

  useEffect(() => {
    updateLoading(true);

    (async function () {
      // fetch dataset here

      updateDataset({
        name: 'Dogs',
        id: '50',
        itemCount: 50,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        dateCreated: '31st Novemeber, 2022',
        plan: 'Hobbyist',
        monthlyCost: {
          storage: 100,
          creation: 23,
          total: 123
        },
        size: 3.2,
        uploadedImages: [
          {
            url: 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e',
            name: 'dog_dog'
          }
        ],
        datasetImages: [
          {
            url: 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e',
            name: 'dog_dog_dog'
          }
        ]
      });

      updateLoading(false);
    })();
  }, []);

  if(loading) return <Loading />;

  return (
    <div className={ classes.eachDatasetContainer }>
      <SideBar name={ dataset.name } page={ subPage } >
        {subPage === 'overview' && <Overview dataset={ dataset } />}

        {subPage === 'uploaded-images' && <UploadedImages dataset={ dataset } />}

        {subPage === 'dataset-images' && <Images dataset={ dataset } />}

        {subPage === 'settings' && <Settings dataset={ dataset } />}
      </SideBar>


    </div>
  );
}
