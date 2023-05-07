import '@/styles/reset.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { UserWrapper } from '@/contexts/userContext';
import Head from 'next/head';
import { NextPage } from 'next';
import React from 'react';

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
                <title>flockfysh | lightning fast large scale ML datasets</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <UserWrapper>
                {getLayout(<Component { ...pageProps } />)}
            </UserWrapper>
        </>
    );
}
