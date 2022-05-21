import Image from 'next/image';
import styles from '../styles/BlogItem.module.scss';
import { Blog } from '../models/types';
import { Tag } from './index';
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
                    <Tag text={category.name} />
                </h3>
                <div className={styles['blog-item__publishedAt']}>
                    <p>{date[0].replaceAll('-', '/')}</p>
                    <p>{Strings.EDITOR_LABEL}</p>
                </div>
            </div>
        </button>
    );
}

export default BlogItem;
