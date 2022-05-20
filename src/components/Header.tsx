import Image from 'next/image';
import styles from '../styles/Header.module.scss';
import { SearchForm } from './index';
import logo from '../../public/images/logo_pc.png';

const toTop = () => {
    // TODO
    console.log('###');
};

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__logo}>
                <Image src={logo} alt='Flutter School' onClick={toTop} />
            </h1>
            <SearchForm />
        </header>
    );
}

export default Header;
