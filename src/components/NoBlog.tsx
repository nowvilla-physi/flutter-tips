import Image from 'next/image';
import styles from '../styles/NoBlog.module.scss';
import * as Strings from '../constants/strings';
import noDataImage from '../../public/images/ic_no_data.png';

function NoBlog() {
    return (
        <section className={styles['no-blog']}>
            <p className={styles['no-blog__message']}>
                {Strings.NO_DATA_MESSAGE}
            </p>
            <div className={styles['no-blog__image']}>
                <Image
                    src={noDataImage}
                    alt='検索結果なし'
                    width={160}
                    height={160}
                />
            </div>
        </section>
    );
}

export default NoBlog;
