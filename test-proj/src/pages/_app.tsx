import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '@/components/layout/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Browse NextJS Events nearby" />
    </Head>
      <Component {...pageProps} />
    </Layout>
}

export default MyApp
