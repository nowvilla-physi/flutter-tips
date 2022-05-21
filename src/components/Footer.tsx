import styles from '../styles/Footer.module.scss';
import * as Strings from '../constants/strings';

function Footer() {
    return (
        <footer className={styles.footer}>
            <p>{Strings.COPYRIGHT}</p>
        </footer>
    );
}

export default Footer;
