import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import Layout from '@/components/layout/layout'
import "@/styles/globals.css";
import { oswald } from '@/styles/fonts';

export default function App({ Component, pageProps }: AppProps) {

  return <SessionProvider>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Layout data={pageProps.data}>
      <Component {...pageProps}></Component>
    </Layout>
  </SessionProvider>
}
