import '../styles/globals.css';
import '@/styles/reset.css';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next';
import React from 'react';

import NotificationWrapper from '../contexts/notificationContext';
import { UserWrapper } from '@/contexts/userContext';
import { ErrorWrapper } from '@/contexts/errorContext';
import { ScreenWrapper } from '@/contexts/screenContext';
import { EmotionCacheProvider } from '@/contexts/reactSelectContext';
import { DownloaderWrapper } from '@/contexts/downloaderContext';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            <Head>
                <title>flockfysh | lightining fast large scale ML datasets</title>

                <meta
                    name="description"
                    content="lightining fast large scale ML datasets"
                />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <EmotionCacheProvider>
                <ScreenWrapper>
                    <UserWrapper>
                        <DownloaderWrapper>
                            {/* <TopLevelErrorBoundary> */}
                            <ErrorWrapper>
                                <NotificationWrapper/>

                                {getLayout(<Component { ...pageProps } />)}
                            </ErrorWrapper>
                            {/* </TopLevelErrorBoundary> */}
                        </DownloaderWrapper>
                    </UserWrapper>
                </ScreenWrapper>
            </EmotionCacheProvider>
        </>
    );
}
