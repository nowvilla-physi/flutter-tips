import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useRouter } from 'next/router';
import client from '../../../lib/client';
import { BlogItem, CategoryButton } from '../../components/index';
import { Blog, Category } from '../../models/types';
import styles from '../../styles/Home.module.scss';
import loadingIcon from '../../../public/images/ic_loading.gif';
import * as Strings from '../../constants/strings';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// 初期に取得するブログの最大件数
const INITIAL_LIMIT = 16;

function CategoryId(props: Props) {
    // getStaticPropsで取得したデータ
    const { filteredBlogs, categories } = props;

    // ブログの一覧
    const [blogs, setBlogs] = useState<Blog[]>(filteredBlogs);

    // スクロール時に取得していないブログがあるかのフラグ
    const [hasMoreBlog, setHasMoreBlog] = useState<boolean>(true);

    // 現在取得したデータの個数
    const [offset, setOffset] = useState<number>(INITIAL_LIMIT);

    const router = useRouter();
    const paths = router.asPath.split('/');
    const filteredCategoryId = paths[paths.length - 1];

    // 読み込み時に表示するコンポーネント
    const loader = (
        <p className={styles['home__blogs-loading']} key={0}>
            <Image src={loadingIcon} width={32} height={32} />
        </p>
    );

    // 画面に表示するブログの一覧
    const blogItems = (
        <article className={styles.home__blogs}>
            {blogs.map((blog: Blog) => (
                <BlogItem
                    key={blog.id}
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
            queries: {
                limit: INITIAL_LIMIT,
                offset,
                filters: `category[equals]${filteredCategoryId}`,
            },
        });

        const newBlogs: Blog[] = data.contents;

        // オフセットを更新する
        setOffset((prevState: number) => prevState + newBlogs.length);

        // 取得したデータが0件の場合は読み込みを終了する
        if (newBlogs.length === 0) {
            setHasMoreBlog(false);
            return;
        }
        setBlogs((prevState: Blog[]) => [...prevState, ...newBlogs]);
    };

    const toFilteredBlogs = (categoryId: string) => {
        if (categoryId == null) {
            router.push(`/`).then();
        } else if (categoryId !== filteredCategoryId) {
            router.push(`/categories/${categoryId}`).then();
        }
    };

    return (
        <section className={styles.home}>
            {/* categories */}
            <section>
                <ul className={styles.home__categories}>
                    <li
                        className={styles['home__categories-item']}
                        key={Strings.ALL_CATEGORY_BUTTON}
                    >
                        <CategoryButton
                            name={Strings.ALL_CATEGORY_BUTTON}
                            handleClick={() => toFilteredBlogs(null)}
                        />
                    </li>
                    {categories.map((category: Category) => (
                        <li
                            className={styles['home__categories-item']}
                            key={category.name}
                        >
                            <CategoryButton
                                name={category.name}
                                handleClick={() => toFilteredBlogs(category.id)}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            {/* blogs */}
            <article className={styles.home__blogs}>
                <InfiniteScroll
                    loadMore={() => loadMore()}
                    hasMore={hasMoreBlog}
                    loader={loader}
                >
                    {blogItems}
                </InfiniteScroll>
            </article>
        </section>
    );
}

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: 'categories' });
    const paths = data.contents.map((content) => `/categories/${content.id}`);
    return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
    const { id } = context.params;

    // APIでフィルタリングしたブログの一覧を取得する
    const blogs = await client.get({
        endpoint: 'blogs',
        queries: {
            limit: INITIAL_LIMIT,
            offset: 0,
            filters: `category[equals]${id}`,
        },
    });
    // APIでカテゴリの一覧を取得する
    const categories = await client.get({ endpoint: 'categories' });
    return {
        props: {
            filteredBlogs: blogs.contents,
            categories: categories.contents,
        },
    };
};

export default CategoryId;
