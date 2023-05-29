import Head from "next/head";
import "../globals.css";

export default function App({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>ARSF-Dic</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}