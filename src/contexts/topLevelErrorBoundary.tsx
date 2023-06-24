// TODO: Does this need to be uncommented?

// import React from 'react';
// import { PrivateBetaError } from '../helpers/errors';
// import TopLevelErrorOverlay from '../components/UI/errors/topLevelErrorOverlay';

// interface TopLevelErrorBoundaryState {
//     error?: Error;
// }


// export default class TopLevelErrorBoundary extends React.Component<{ children: React.ReactNode }, TopLevelErrorBoundaryState> {
//     state: TopLevelErrorBoundaryState = { error: undefined };

//     componentDidMount() {
//         window.addEventListener('unhandledrejection', this.onUnhandledRejection);
//     }

//     componentWillUnmount() {
//         window.removeEventListener('unhandledrejection', this.onUnhandledRejection);
//     }

//     onUnhandledRejection = (event: PromiseRejectionEvent) => {
//         event.promise.catch((error) => {
//             this.setState(TopLevelErrorBoundary.getDerivedStateFromError(error));
//         });
//     };

//     closeError() {
//         this.setState({
//             error: undefined,
//         });
//     }

//     static getDerivedStateFromError(error: Error): TopLevelErrorBoundaryState {
//         return { error: error };
//     }

//     render() {
//         let errOverlay = undefined;
//         const curError = this.state.error;
//         if (curError) {
//             if (curError instanceof PrivateBetaError) {
//                 errOverlay = (
//                     <TopLevelErrorOverlay fullScreen={ true } requiresLogout={ true } message={ curError.message }
//                                           title={ 'Flockfysh is in private beta.' }
//                                           closeError={ () => this.closeError() } background={ true }></TopLevelErrorOverlay>
//                 );
//             }
//             else {
//                 errOverlay = (
//                     <TopLevelErrorOverlay fullScreen={ false } requiresLogout={ false } message={ curError.message }
//                                           title={ 'Error!' }
//                                           closeError={ () => this.closeError() }></TopLevelErrorOverlay>
//                 );
//             }
//         }
//         return (
//             <>
//                 <>
//                     {this.props.children}
//                 </>
//                 {errOverlay}
//             </>
//         );
//     }
// }
