import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

// #region Page Imports

import PageNotFound from './pages/pageNotFound/pageNotFound';

import HypePage from './pages/hype/hype';
import LoginPage from './pages/login/login';
import Docs from './pages/docs/docs';
import Blog from './pages/blog/blog';
import About from './pages/about/about';
import PrivacyPage from './pages/privacy/privacy';
import TermsPage from './pages/terms/terms';
import Profile from './pages/profile/profile';
import Authorize from './pages/authorize/authorize';

import ViewDatasets from './pages/viewDatasets/viewDatasets';
import EachDataset from './pages/eachDataset/eachDataset';
import CreateDataset from './pages/createDataset/createDataset';

// #endregion

import RootLayout from './components/rootLayout';
import PrivateRoutes from './components/privateRoutes';

import { UserWrapper } from './contexts/userContext';
import { ScreenWrapper } from './contexts/screenContext';
import { EmotionCacheProvider } from './contexts/reactSelectContext';

import './index.css';
import { ErrorWrapper } from './contexts/errorContext';
import Background from './components/hypePage/background/background';
import Tester from './pages/tester/tester';

/**
 * Wraps entire App with neccessary Contexts
 *
 * @param props App
 * @returns Wrapped Component
 */
function AppWrapper(props: React.PropsWithChildren) {
    return (
        <EmotionCacheProvider>
            <ScreenWrapper>
                <ErrorWrapper>
                    <UserWrapper>
                        <Background></Background>
                        {props.children}
                    </UserWrapper>
                </ErrorWrapper>
            </ScreenWrapper>
        </EmotionCacheProvider>
    );
}

function MainApp() {
    return (
        <AppWrapper>
            <Routes>
                <Route>
                    <Route path="/" element={ <RootLayout/> }>
                        <Route index element={ <HypePage/> }/>

                        <Route path="/tester" element={ <Tester/> }/>
                        <Route path="/blog" element={ <Blog/> }/>
                        <Route path="/docs" element={ <Docs/> }/>
                        <Route path="/about" element={ <About/> }/>
                        <Route path="/privacy" element={ <PrivacyPage/> }/>
                        <Route path="/terms" element={ <TermsPage/> }/>
                        <Route path="/login" element={ <LoginPage type="Login"/> }/>
                        <Route path="/signup" element={ <LoginPage type="Signup"/> }/>

                        <Route element={ <PrivateRoutes/> }>
                            <Route path="/authorize" element={ <Authorize/> }/>
                        </Route>

                        <Route path="*" element={ <PageNotFound/> }/>
                    </Route>

                    <Route path="/dashboard" element={ <PrivateRoutes/> }>
                        <Route element={ <RootLayout/> }>
                            <Route index element={ <ViewDatasets/> }/>

                            <Route path="profile" element={ <Profile/> }/>
                            <Route path="create-dataset" element={ <CreateDataset/> }/>
                        </Route>

                        <Route
                            path=":datasetId/overview"
                            element={ <EachDataset page="overview"/> }
                        />

                        <Route
                            path=":datasetId/uploaded-images"
                            element={ <EachDataset page="uploaded-images"/> }
                        />

                        <Route
                            path=":datasetId/feedback-images"
                            element={ <EachDataset page="feedback-images"/> }
                        />

                        <Route
                            path=":datasetId/dataset-images"
                            element={ <EachDataset page="dataset-images"/> }
                        />

                        <Route
                            path=":datasetId/annotate"
                            element={ <EachDataset page="annotate"/> }
                        />

                        <Route
                            path=":datasetId/settings"
                            element={ <EachDataset page="settings"/> }
                        />

                        <Route
                            path=":datasetId/train"
                            element={ <EachDataset page="train"/> }
                        />
                    </Route>
                </Route>
            </Routes>
        </AppWrapper>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <MainApp/>
    </BrowserRouter>,
    // </React.StrictMode>
);
