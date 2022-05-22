import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import { Footer, Header } from '../components/index';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className='app'>
            <Head>
                <title>FlutterTips</title>
            </Head>
            <NextNProgress
                color='#53C6F8'
                startPosition={0.2}
                stopDelayMs={50}
                height={3}
                showOnShallow
            />
            <Header />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}

export default MyApp;
