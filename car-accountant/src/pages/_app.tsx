import '@/styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import createEmotionCache from './EmotionalCache'
import { LinearProgress, ThemeProvider } from '@mui/material'
import theme from '../styles/theme'
import Head from 'next/head'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState, wrapper } from '@/features/redux/store'
import { asyncAuthentication } from '@/features/redux/auth/reducer'
import Login from './login'
import ResponsiveDrawer from '@/components/layout'

interface MyAppProps {
  Component: any
  pageProps: any
  emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const router = useRouter()
  const user = useSelector((state: RootState) => state.auth.user)
  const state = useSelector((state: RootState) => state)
  console.log('api probably ? ', process.env.REACT_APP_API_URL)

  useEffect(() => {
    if (!user && !state.auth.loading) {
      dispatch(asyncAuthentication())
    }
  }, [dispatch, user])

  useEffect(() => {
    if (!user && state.auth.isDoneAuthenticated && router.pathname !== '/login') {
      router.push('/login')
    }
  }, [user, router])

  if (state.auth.loading && !state.auth.isDoneAuthenticated) {
    return <LinearProgress color='primary' />
  }

  if (!state.auth.loading && state.auth.isDoneAuthenticated) {
    return (
      <CacheProvider value={emotionCache}>
        <Head>
          <title>CarAccountant</title>
          <meta name='description' content='Generated by CarAccountant' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link href='https://fonts.googleapis.com/css?family=Montserrat&display=swap' rel='stylesheet'></link>
          <link
            rel='stylesheet'
            type='text/css'
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
          />
          <link
            rel='stylesheet'
            type='text/css'
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <ThemeProvider theme={theme}>
          {user ? (
            <>
              <ResponsiveDrawer>
                <Component user={user} {...pageProps} />
              </ResponsiveDrawer>
            </>
          ) : (
            <Login user={user} {...pageProps} />
          )}
        </ThemeProvider>
      </CacheProvider>
    )
  }
}

export default wrapper.withRedux(App)
