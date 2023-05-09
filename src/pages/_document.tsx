import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta
                    name="description"
                    content="lightining fast large scalle ML datasets"
                />
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <body>
                <Main />
                
                <NextScript />
            </body>
        </Html>
    );
}
