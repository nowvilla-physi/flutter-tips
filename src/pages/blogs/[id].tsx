import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/androidstudio.css';
import { useEffect, useState } from 'react';
import client from '../../../lib/client';
import { RelatedArticle, Tag } from '../../components/index';
import styles from '../../styles/Article.module.scss';
import * as Strings from '../../constants/strings';
import * as Config from '../../constants/config';
import portfolioIcon from '../../../public/images/ic_portfolio.png';
import { Blog, Toc } from '../../models/types';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Article(props: Props) {
    const { allBlogs, blog, body, toc } = props;
    const { id, publishedAt, updatedAt, title, category } = blog;
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
    const [newBlogs, setNewBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const blogs = allBlogs.filter(
            (item: Blog) => item.category.id === category.id
        );
        setNewBlogs(allBlogs.slice(0, Config.MAX_NEW_BLOG_COUNT));

        // eslint-disable-next-line no-plusplus
        for (let i = blogs.length; i > 1; i--) {
            const k = Math.floor(Math.random() * i);
            [blogs[k], blogs[i - 1]] = [blogs[i - 1], blogs[k]];
        }
        setRelatedBlogs(blogs.slice(0, Config.MAX_RELATED_BLOG_COUNT));
    }, [props]);

    return (
        <article className={styles.article} key={id}>
            <main className={styles.article__container}>
                <section className={styles.article__contents}>
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
                </section>
                <section className={styles['related-article']}>
                    <h3 className={styles['related-article__label']}>
                        {Strings.RELATED_BLOG_LABEL}
                    </h3>
                    <ul className={styles['related-article__items']}>
                        {relatedBlogs.map((relatedBlog: Blog) => (
                            <li
                                key={relatedBlog.id}
                                className={styles['related-article__item']}
                            >
                                <RelatedArticle
                                    id={relatedBlog.id}
                                    createdAt={relatedBlog.createdAt}
                                    updatedAt={relatedBlog.updatedAt}
                                    publishedAt={relatedBlog.publishedAt}
                                    revisedAt={relatedBlog.revisedAt}
                                    title={relatedBlog.title}
                                    content={relatedBlog.content}
                                    category={relatedBlog.category}
                                    eyecatch={relatedBlog.eyecatch}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
                <section className={styles['related-article']}>
                    <h3 className={styles['related-article__label']}>
                        {Strings.NEW_BLOG_LABEL}
                    </h3>
                    <ul className={styles['related-article__items']}>
                        {newBlogs.map((newBlog: Blog) => (
                            <li
                                key={newBlog.id}
                                className={styles['related-article__item']}
                            >
                                <RelatedArticle
                                    id={newBlog.id}
                                    createdAt={newBlog.createdAt}
                                    updatedAt={newBlog.updatedAt}
                                    publishedAt={newBlog.publishedAt}
                                    revisedAt={newBlog.revisedAt}
                                    title={newBlog.title}
                                    content={newBlog.content}
                                    category={newBlog.category}
                                    eyecatch={newBlog.eyecatch}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
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
 * 全てのブログと指定したブログIdのブログを返す。
 *
 * @return {Promise<{props: {blogs: any}}>} ブログ
 */
export const getStaticProps = async (context) => {
    const { id } = context.params;
    try {
        // APIでブログの一覧を取得する
        const allBlogs = await client.get({
            endpoint: 'blogs',
            queries: {
                limit: Config.INITIAL_FETCHING_BLOG_COUNT,
                orders: '-createdAt',
            },
        });
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
        const headers = $('h2, h3').toArray();
        const toc = headers
            .map((element) => ({
                text: 'children' in element ? element.children[0].data : '',
                id: 'attribs' in element ? element.attribs.id : '',
                name: 'name' in element ? element.name : '',
            }))
            // 不要な見出しの改行を排除する
            .filter((item: Toc) => item.text !== undefined);

        return { props: { allBlogs: allBlogs.contents, blog, body: $.html(), toc } };
    } catch (error) {
        return { props: {} };
    }
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
