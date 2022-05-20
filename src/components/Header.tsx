import Image from 'next/image';
import styles from '../styles/Header.module.scss';
import { IconButton, SearchForm } from './index';
import * as Strings from '../constants/strings';
import logoPC from '../../public/images/logo_pc.png';
import portfolioIcon from '../../public/images/ic_portfolio.png';
import gitHubIcon from '../../public/images/ic_github.png';
import twitterIcon from '../../public/images/ic_twitter.png';
import zennIcon from '../../public/images/ic_zenn.png';

const toTop = () => {
    // TODO
    console.log('###');
};

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__logo}>
                <Image src={logoPC} alt='Flutter School' onClick={toTop} />
            </h1>
            <SearchForm />
            <ul className={styles.header__icons}>
                <li className={styles['header__icons-item']}>
                    <IconButton
                        url={Strings.PORTFOLIO_URL}
                        imagePath={portfolioIcon}
                    />
                </li>
                <li className={styles['header__icons-item']}>
                    <IconButton
                        url={Strings.GITHUB_URL}
                        imagePath={gitHubIcon}
                    />
                </li>
                <li className={styles['header__icons-item']}>
                    <IconButton
                        url={Strings.TWITTER_URL}
                        imagePath={twitterIcon}
                    />
                </li>
                <li className={styles['header__icons-item']}>
                    <IconButton url={Strings.ZENN_URL} imagePath={zennIcon} />
                </li>
            </ul>
        </header>
    );
}

export default Header;
