import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import {ToastContainer} from "react-toastify";
import classNames from "classnames";
import theme from '../components/material-ui-lib/theme';
import createEmotionCache from '../components/material-ui-lib/createEmotionCache';
import '../styles/global.css';
import '../styles/fonts.css';
import "react-toastify/dist/ReactToastify.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <title>Blazarbit</title>
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <Component {...pageProps} />
                <ToastContainer
                    position="top-center"
                    className={classNames("medium16", "notificationToast")}
                    autoClose={false}
                    hideProgressBar={true}
                    newestOnTop={false}
                    draggable={false}
                    enableMultiContainer
                    closeOnClick
                    pauseOnHover
                />
            </ThemeProvider>
        </CacheProvider>
    );
}
