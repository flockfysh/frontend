import type { AppProps } from 'next/app';
import Head from 'next/head';

import NotificationWrapper from '../contexts/notificationContext';
import { UserWrapper } from '../contexts/userContext';
import { ErrorWrapper } from '../contexts/errorContext';
import { ScreenWrapper } from '../contexts/screenContext';
import { EmotionCacheProvider } from '../contexts/reactSelectContext';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>flockfysh | lightining fast large scalle ML datasets</title>
                    
                <meta
                    name="description"
                    content="lightining fast large scalle ML datasets"
                />
                
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <EmotionCacheProvider>
                <ScreenWrapper>
                    <UserWrapper>
                        {/* <TopLevelErrorBoundary> */}
                            <ErrorWrapper>
                                <NotificationWrapper />

                                <Component { ...pageProps } />
                            </ErrorWrapper>
                        {/* </TopLevelErrorBoundary> */}
                    </UserWrapper>
                </ScreenWrapper>
            </EmotionCacheProvider>
        </>
    );
}
