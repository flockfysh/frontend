import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta
                    name="description"
                    content="lightning fast large scalle ML datasets"
                />

                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta property="og:title" content="flockfysh | lightning fast large scale ML datasets" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="http://www.flockfysh.tech/" />
                <meta property="og:image" content="" />
                <meta property="og:description" content="lightning fast large scale ML datasets" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <body>
                <Main />

                <NextScript />
            </body>
        </Html>
    );
}
