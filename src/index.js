import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
   Route,
   BrowserRouter,
   Routes,
} from 'react-router-dom';

// #region Page Imports

import RootLayout from './pages/rootLayout';

import PageNotFound from './pages/pageNotFound/pageNotFound';

import HomePage from './pages/home/home';
import LoginPage from './pages/login/login';
import Docs from './pages/docs/docs';
import Blog from './pages/blog/blog';
import About from './pages/about/about';
import Profile from './pages/profile/profile';
import ViewDatasets from './pages/viewDatasets/viewDatasets';
import EachDataSet from './pages/eachDataset/eachDataset';
import CreateDataset from './pages/createDataset/createDataset';

// #endregion

import PrivateRoutes from './components/privateRoutes';

import { UserContext } from './userContext';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

function MainApp() {
   const [loggedIn, updateLoggedIn] = useState(false); // get value from backend

   function setLoggedIn() {
      updateLoggedIn(true);
   }

   return (
      <UserContext.Provider value={ { loggedIn, setLoggedIn } }>
         <Routes>
               <Route>
                  <Route path="/" element={ <RootLayout /> }>
                     <Route index element={ <HomePage /> } />

                     <Route path="/blog" element={ <Blog /> } />
                     <Route path="/docs" element={ <Docs /> } />
                     <Route path="/about" element={ <About /> } />

                     <Route path="/login" element={ <LoginPage type="Login" /> } />
                     <Route path="/signup" element={ <LoginPage type="Signup" /> } />

                     <Route path="*" element={ <PageNotFound /> } />
                  </Route>

                  <Route path="/dashboard" element={ (
                     <>
                        <RootLayout />

                        <PrivateRoutes />
                     </>
                  ) }>
                     <Route index element={ <ViewDatasets /> } />

                     <Route path="profile" element={ <Profile /> } />
                     
                  </Route>

                  <Route path="/dashboard" element={ <PrivateRoutes /> }>
                     <Route path=":datasetId/overview" element={ <EachDataSet page="overview" /> } />

                     <Route
                        path=":datasetId/uploaded-images"
                        element={ <EachDataSet page="uploaded-images" /> }
                     />

                     <Route
                        path=":datasetId/dataset-images"
                        element={ <EachDataSet page="dataset-images" /> }
                     />

                     <Route
                        path=":datasetId/settings"
                        element={ <EachDataSet page="settings" /> }
                     />
                  </Route>
               </Route>
         </Routes>
      </UserContext.Provider>
   );
}

root.render(
   <React.StrictMode>
      <BrowserRouter>
         <MainApp />
      </BrowserRouter>
   </React.StrictMode>
);
