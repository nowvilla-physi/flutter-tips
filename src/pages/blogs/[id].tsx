import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/androidstudio.css';
import client from '../../../lib/client';
import { Tag } from '../../components/index';
import styles from '../../styles/Article.module.scss';
import * as Strings from '../../constants/strings';
import portfolioIcon from '../../../public/images/ic_portfolio.png';
import { Toc } from '../../models/types';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Article({ blog, body, toc }: Props) {
    const { id, publishedAt, updatedAt, title, category } = blog;

    return (
        <article className={styles.article} key={id}>
            <main className={styles.article__contents}>
                <div className={styles.article__header}>
                    <Image
                        src={portfolioIcon}
                        alt='アイコン'
                        width={32}
                        height={32}
                    />
                    <span className={styles.article__editor}>
                        {Strings.EDITOR_LABEL}
                    </span>
                </div>
                <span className={styles.article__publishedAt}>
                    {createPublishedAt(publishedAt)}
                </span>
                <span className={styles.article__updatedAt}>
                    {createUpdatedAt(updatedAt)}
                </span>
                <p className={styles.article__tag}>
                    <Tag text={category.name} />
                </p>
                <h2 className={styles.article__title}>{title}</h2>
                <div
                    className={styles.article__body}
                    dangerouslySetInnerHTML={{ __html: body }}
                />
            </main>
            <aside className={styles.article__aside}>
                <section className={styles.article__toc}>
                    <p className={styles['article__toc-label']}>
                        {Strings.TOC_LABEL}
                    </p>
                    <ul className={styles['article__toc-nav']}>
                        {toc.map((item: Toc) => (
                            <li
                                key={item.id}
                                className={styles[`article__toc-${item.name}`]}
                            >
                                <Link href={`#${item.id}`}>
                                    <a>{item.text}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </aside>
        </article>
    );
}

/**
 * ブログのパスを返す。
 *
 * @return {Promise<{ paths, fallback: false }>} ブログのパス
 */
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: 'blogs' });

    const paths = data.contents.map((content) => `/blogs/${content.id}`);
    return { paths, fallback: false };
};

/**
 * 指定したブログIdのブログを返す。
 *
 * @return {Promise<{props: {blogs: any}}>} ブログ
 */
export const getStaticProps = async (context) => {
    const { id } = context.params;
    const blog = await client.get({ endpoint: 'blogs', contentId: id });

    // リッチテキストを解析する
    const $ = cheerio.load(blog.content || '');

    // iframeタグをラップする
    $('iframe').wrap('<div class="iframe-wrapper" />');

    // コードブロックにハイライトを当てる
    $('pre code').each((_, element) => {
        const result = hljs.highlightAuto($(element).text());
        $(element).html(result.value);
        $(element).addClass('hljs');
    });

    // 目次に必要なデータ
    const headers = $('h1, h2, h3').toArray();
    const toc = headers.map((element) => ({
        text: 'children' in element ? element.children[0].data : '',
        id: 'attribs' in element ? element.attribs.id : '',
        name: 'name' in element ? element.name : '',
    }));

    return { props: { blog, body: $.html(), toc } };
};

/**
 * 画面表示用の公開日を生成する。
 *
 * @param publishedAt サーバーから取得した公開日文字列
 * @return {string} 画面表示用の公開日文字列
 */
export const createPublishedAt = (publishedAt: string) => {
    if (publishedAt == null) {
        return '';
    }
    return `${Strings.PUBLISHED_AT_LABEL}${createDisplayTimestamp(
        publishedAt
    )}`;
};

/**
 * 画面表示用の更新日を生成する。
 *
 * @param updatedAt サーバーから取得した更新日文字列
 * @return {string} 画面表示用の更新日文字列
 */
export const createUpdatedAt = (updatedAt: string) => {
    if (updatedAt == null) {
        return '';
    }
    return `${Strings.UPDATED_AT_LABEL}${createDisplayTimestamp(updatedAt)}`;
};

/**
 * タイムスタンプを年月日のフォーマットに変換する
 *
 * @param timestamp タイムスタンプ
 * @return {string} 年月日のフォーマットのタイムスタンプ
 */
export const createDisplayTimestamp = (timestamp: string) => {
    if (timestamp == null) {
        return '';
    }
    const date = timestamp.split('T');
    return `${date[0].replace('-', '年').replace('-', '月')}日`;
};

export default Article;
