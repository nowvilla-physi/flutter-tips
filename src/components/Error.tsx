import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Error.module.scss';
import * as Strings from '../constants/strings';
import { Button } from './index';

type Props = {
    errorCode: String;
    errorMessage: String;
    errorImage: any;
};

function Error(props: Props) {
    const { errorCode, errorMessage, errorImage } = props;
    const router = useRouter();
    const toHome = () => {
        router.push(Strings.HOME_URL).then();
    };

    return (
        <section className={styles.error}>
            <h2 className={styles['error__not-found']}>{errorCode}</h2>
            <p className={styles.error__message}>{errorMessage}</p>
            <div className={styles.error__image}>
                <Image src={errorImage} alt='エラー' />
            </div>
            <Button name={Strings.ERROR_BUTTON} handleClick={toHome} />
        </section>
    );
}

export default Error;
