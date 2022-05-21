import { AppProps } from 'next/app';
import { Footer, Header } from '../components/index';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className='app'>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}

export default MyApp;
