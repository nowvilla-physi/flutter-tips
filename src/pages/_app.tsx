import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import { Footer, Header } from '../components/index';
import { blogContext, useBlog } from '../hooks/useBlog';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
    const context = useBlog();

    return (
        <div className='app'>
            <blogContext.Provider value={context}>
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
            </blogContext.Provider>
        </div>
    );
}

export default MyApp;
