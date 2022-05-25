import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import NextNProgress from 'nextjs-progressbar';
import { Footer, Header } from '../components/index';
import { blogContext, useBlog } from '../hooks/useBlog';
import '../styles/globals.scss';
import * as Strings from '../constants/strings';

function MyApp({ Component, pageProps }: AppProps) {
    const context = useBlog();

    return (
        <main className='app'>
            <blogContext.Provider value={context}>
                <DefaultSeo
                    defaultTitle={Strings.DEFAULT_TITLE}
                    canonical='TODO'
                    description={Strings.DEFAULT_DESCRIPTION}
                    twitter={{
                        handle: 'nowvilla_physi',
                        site: 'nowvilla_physi',
                        cardType: 'summary_large_image',
                    }}
                    openGraph={{
                        type: 'website',
                        title: Strings.DEFAULT_TITLE,
                        description: Strings.DEFAULT_DESCRIPTION,
                        site_name: Strings.DEFAULT_TITLE,
                        url: 'TODO',
                        images: [
                            {
                                url: 'https://images.microcms-assets.io/assets/554db8d2035e4891bfff877069b0a712/5747f13ba4604c309505bf6f52062b0b/default_ogp.png',
                                width: 800,
                                height: 600,
                                alt: Strings.DEFAULT_TITLE,
                                type: 'image/png',
                            },
                        ],
                    }}
                />
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
        </main>
    );
}

export default MyApp;
