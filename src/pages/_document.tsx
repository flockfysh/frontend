import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="lightning fast, large scale ML datasets"
        />

        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          property="og:title"
          content="flockfysh | lightning fast large scale ML datasets"
        />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://www.flockfysh.ai/" />
        <meta property="og:image" content="" />
        <meta
          property="og:description"
          content="lightning fast large scale ML datasets"
        />
        <meta 
          name="google-adsense-account" 
          content="ca-pub-8241648335060628"
          />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
