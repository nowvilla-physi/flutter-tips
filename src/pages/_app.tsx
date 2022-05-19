import { AppProps } from 'next/app';
import { Header } from '../components';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
    // return <Component {...pageProps} />;
    return (
        <div className='app'>
            <Header />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
