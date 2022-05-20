import Image from 'next/image';
import styles from '../styles/BlogItem.module.scss';
import { Blog } from '../models/types';
import * as Strings from '../constants/strings';

function BlogItem(props: Blog) {
    const { id, publishedAt, title, category, eyecatch } = props;
    const date = publishedAt.split('T');

    return (
        <button className={styles['blog-item']} key={id} type='button'>
            <div className={styles['blog-item__image']}>
                <Image
                    src={eyecatch.url}
                    alt='ブログ記事'
                    width='320'
                    height='200'
                />
            </div>
            <div className={styles['blog-item__body']}>
                <h2 className={styles['blog-item__title']}>{title}</h2>
                <h3 className={styles['blog-item__category']}>
                    {Strings.CATEGORY_LABEL}
                    {category.name}
                </h3>
                <p className={styles['blog-item__publishedAt']}>{date[0]}</p>
                <p className={styles['blog-item__editor']}>
                    {Strings.EDITOR_LABEL}
                </p>
            </div>
        </button>
    );
}

export default BlogItem;
