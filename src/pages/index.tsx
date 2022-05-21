import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useRouter } from 'next/router';
import client from '../../lib/client';
import { BlogItem, CategoryButton } from '../components/index';
import { Blog, Category } from '../models/types';
import styles from '../styles/Home.module.scss';
import loadingIcon from '../../public/images/ic_loading.gif';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// 初期に取得するブログの最大件数
const INITIAL_LIMIT = 16;

function Home(props: Props) {
    // getStaticPropsで取得したデータ
    const { initialBlogs, categories } = props;

    // 画面に表示するブログの一覧
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

    // スクロール時に取得していないブログがあるかのフラグ
    const [hasMoreBlog, setHasMoreBlog] = useState<boolean>(true);

    // スクロール時に取得していないブログがあるかのフラグ
    const [offset, setOffset] = useState<number>(INITIAL_LIMIT);

    // 読み込み時に表示するコンポーネント
    const loader = (
        <p className={styles['home__blogs-loading']}>
            <Image src={loadingIcon} width={32} height={32} />
        </p>
    );

    const router = useRouter();
    const toCategories = (category: Category) => {
        router.push(`/categories/${category.id}`).then();
    };

    // 画面に表示するブログの一覧
    const blogItems = (
        <article className={styles.home__blogs}>
            {blogs.map((blog: Blog) => (
                <BlogItem
                    id={blog.id}
                    createdAt={blog.createdAt}
                    updatedAt={blog.updatedAt}
                    publishedAt={blog.publishedAt}
                    revisedAt={blog.revisedAt}
                    title={blog.title}
                    content={blog.content}
                    category={blog.category}
                    eyecatch={blog.eyecatch}
                />
            ))}
        </article>
    );

    /**
     * スクロール時に取得していないブログを取得する
     */
    const loadMore = async () => {
        const data = await client.get({
            endpoint: 'blogs',
            queries: { limit: 16, offset },
        });
        const newBlogs: Blog[] = data.contents;
        setOffset((prevState: number) => prevState + blogs.length);

        // 取得したデータが0件の場合は読み込みを終了する
        if (newBlogs.length === 0) {
            setHasMoreBlog(false);
            return;
        }

        setBlogs((prevState: Blog[]) => [...prevState, ...newBlogs]);
    };

    return (
        <section className={styles.home}>
            {/* categories */}
            <section>
                <ul className={styles.home__categories}>
                    {categories.map((category: Category) => (
                        <li className={styles['home__categories-item']}>
                            <CategoryButton
                                name={category.name}
                                handleClick={() => toCategories(category)}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            {/* blogs */}
            <article className={styles.home__blogs}>
                <InfiniteScroll
                    loadMore={loadMore}
                    hasMore={hasMoreBlog}
                    loader={loader}
                >
                    {blogItems}
                </InfiniteScroll>
            </article>
        </section>
    );
}

/**
 * ブログの一覧を返す(画面表示に呼ばれる)。
 *
 * @return {Promise<{props: {blogs: any, categories: any}}>} ブログとカテゴリーの一覧
 */
export const getStaticProps = async () => {
    // APIでブログの一覧を取得する
    const blogs = await client.get({
        endpoint: 'blogs',
        queries: { limit: INITIAL_LIMIT, offset: 0 },
    });
    // APIでカテゴリの一覧を取得する
    const categories = await client.get({ endpoint: 'categories' });
    return {
        props: {
            initialBlogs: blogs.contents,
            categories: categories.contents,
        },
    };
};

export default Home;
