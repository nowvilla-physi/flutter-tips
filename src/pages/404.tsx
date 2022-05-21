import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Error.module.scss';
import * as Strings from '../constants/strings';
import errorIcon from '../../public/images/ic_404.png';
import { Button } from '../components/index';

function Error() {
    const router = useRouter();
    const toHome = () => {
        router.push(Strings.HOME_URL).then();
    };

    return (
        <section className={styles.error}>
            <h2 className={styles['error__not-found']}>{Strings.NOT_FOUND}</h2>
            <p className={styles.error__message}>{Strings.NOT_FOUND_MESSAGE}</p>
            <div className={styles.error__image}>
                <Image src={errorIcon} alt='エラー' />
            </div>
            <Button name={Strings.ERROR_BUTTON} handleClick={toHome} />
        </section>
    );
}

export default Error;
