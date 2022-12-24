import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import EachDataSetSideBar from '../../components/dashboard/eachDataset/eachDataSetSideBar/eachDataSetSideBar';
import EachDatasetOverview from '../../components/dashboard/eachDataset/eachDatasetOverview/eachDatasetOverview';
import EachDatasetUploadedImages from '../../components/dashboard/eachDataset/eachDatasetUploadedImages/eachDatasetUploadedImages';
import EachDatasetImages from '../../components/dashboard/eachDataset/eachDatasetImages/eachDatasetImages';
import Settings from '../../components/dashboard/eachDataset/settings/settings';
import Loading from '../../components/loading/loading';

import classes from './eachDataset.module.css';

export default function EachDataSet(props) {
   const { datasetId } = useParams();

   const [dataset, updateDataset] = useState(null);
   const [loading, updateLoading] = useState(true);

   let subPage = props.page;

   useEffect(() => {
      updateLoading(true);

      (async function() {
         // fetch dataset here

         updateDataset({
            name: 'Dogs',
            overview:
               'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            dateCreated: '31st Novemeber, 2022',
            plan: 'Hobbyist',
            monthlyCost: {
               storage: 100,
               creation: 23,
            },
            size: 3.2,
            uploadedImages: [
               {
                  url: 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e',
                  name: 'dog_dog',
               },
            ],
            datasetImages: [
               {
                  url: 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e',
                  name: 'dog_dog_dog',
               },
            ],
         });

         updateLoading(false);
      })();
      
   }, []);

   if (loading) return <Loading />;

   return (
      <div className={ classes.eachDataSetContainer }>
         <EachDataSetSideBar name={ dataset.name } page={ subPage } id={ datasetId } />

         { subPage === "overview" && <EachDatasetOverview dataset={ dataset } /> }

         { subPage === "uploaded-images" && <EachDatasetUploadedImages dataset={ dataset } /> }

         { subPage === "dataset-images" && <EachDatasetImages dataset={ dataset } /> }

         { subPage === "settings" && <Settings dataset={ dataset } /> }
      </div>
   );
}
