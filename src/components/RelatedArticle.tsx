import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/RelatedArticle.module.scss';
import { Blog } from '../models/types';
import * as Strings from '../constants/strings';

function RelatedArticle(props: Blog) {
    const { id, title, eyecatch } = props;

    return (
        <div className={styles.article}>
            <Image src={eyecatch.url} alt='アイコン' width={80} height={80} />
            <div className={styles.article__container}>
                <Link className={styles.article__title} href={`/blogs/${id}`}>
                    <a>{title}</a>
                </Link>
                <p className={styles.article__editor}>{Strings.EDITOR_LABEL}</p>
            </div>
        </div>
    );
}

export default RelatedArticle;
