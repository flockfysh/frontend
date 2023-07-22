import React from 'react';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { DownloaderWrapper } from '@/contexts/downloaderContext';
import { ErrorWrapper } from '@/contexts/errorContext';
import { ModalWrapper } from '@/contexts/modalContext';
import { PostWrapper } from '@/contexts/postContext';
import { EmotionCacheProvider } from '@/contexts/reactSelectContext';
import { ScreenWrapper } from '@/contexts/screenContext';
import { UserWrapper } from '@/contexts/userContext';

import { ToastWrapper } from '@/contexts/toastContext';
import '@/styles/globals.css';
import '@/styles/reset.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            <Head>
                <title>
                    flockfysh | lightning fast large scale ML datasets
                </title>

                <meta
                    name="description"
                    content="lightning fast large scale ML datasets"
                />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <EmotionCacheProvider>
                <ScreenWrapper>
                    <ToastWrapper>
                        <ModalWrapper>
                            <UserWrapper>
                                <DownloaderWrapper>
                                    <PostWrapper>
                                        { /* <TopLevelErrorBoundary> */ }
                                        <ErrorWrapper>
                                            { /*<NotificationWrapper />*/ }

                                            { getLayout(
                                                <Component { ...pageProps } />
                                            ) }
                                        </ErrorWrapper>
                                        { /* </TopLevelErrorBoundary> */ }
                                    </PostWrapper>
                                </DownloaderWrapper>
                            </UserWrapper>
                        </ModalWrapper>
                    </ToastWrapper>
                </ScreenWrapper>
            </EmotionCacheProvider>
        </>
    );
}
