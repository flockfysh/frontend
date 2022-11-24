import React from "react";
import ReactDOM from "react-dom/client";
import {
   createBrowserRouter,
   RouterProvider,
   createRoutesFromElements,
   Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/LoginPage";
import Docs from "./pages/Docs";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import ViewDatasets from "./pages/ViewDatasets/ViewDatasets";
import EachDataSet from "./pages/EachDataSet/EachDataSet";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route>
         <Route path="/" element={ <RootLayout /> }>
            <Route index element={ <HomePage /> } />

            <Route path="/docs" element={ <Docs /> } />
            <Route path="/blog" element={ <Blog /> } />
            <Route path="/about" element={ <About /> } />
            <Route path="/login" element={ <LoginPage type="Login" /> } />
            <Route path="/signup" element={ <LoginPage type="Signup" /> } />

            <Route path="*" element={ <PageNotFound /> } />
         </Route>

         <Route path="/dashboard">
            <Route index element={ <ViewDatasets /> } />

            <Route path="profile" element={ <Profile /> } />
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
   )
);

root.render(
   <React.StrictMode>
      <RouterProvider router={ router } />
   </React.StrictMode>
);
