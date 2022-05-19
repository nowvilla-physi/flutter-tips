import Image from 'next/image';
import styles from '../styles/Header.module.scss';
import { SearchForm } from './index';
import logo from '../../public/images/logo.png';

const toTop = () => {
    console.log('###');
};

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__logo}>
                <Image src={logo} alt='Flutter School' onClick={toTop} />
            </h1>
            <SearchForm />
            <h1 className={styles.header__logo}>
                <Image src={logo} alt='Flutter School' onClick={toTop} />
            </h1>
        </header>
    );
}

export default Header;
