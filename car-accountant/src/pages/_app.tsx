import { ReduxProvider } from '@/redux/provider';
import '@/styles/globals.css';
import { CacheProvider, EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import createEmotionCache from './EmotionalCache';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import HeaderWrapper from '@/components/header/header';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>CarAccountant</title>
        <meta name="description" content="Generated by CarAccountant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReduxProvider>
        <ThemeProvider theme={theme}>
          <HeaderWrapper>
            <main>
              <Component {...pageProps} />
            </main>
          </HeaderWrapper>
        </ThemeProvider>
      </ReduxProvider>
    </CacheProvider>
  );
}
