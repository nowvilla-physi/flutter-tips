import { InferGetStaticPropsType } from 'next';
import { useContext, useEffect } from 'react';
import client from '../../lib/client';
import { BlogItem, CategoryButton, Error, NoBlog } from '../components/index';
import { Blog, Category } from '../models/types';
import styles from '../styles/Home.module.scss';
import * as Strings from '../constants/strings';
import * as Config from '../constants/config';
import errorImage from '../../public/images/ic_500.png';
import { blogContext } from '../hooks/useBlog';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Home(props: Props) {
    // getStaticPropsで取得したデータ
    const { fetchedBlogs, categories } = props;
    const context = useContext(blogContext);
    const { blogs } = context;
    const { allBlogs } = context;

    useEffect(() => {
        // useContextにステートを保持する
        context.setAllBlog(fetchedBlogs);
        context.setBlog(fetchedBlogs);
    }, []);

    /**
     * 指定したカテゴリーでブログをフィルターする。
     *
     * @param categoryId カテゴリーId
     */
    const filterBlog = (categoryId: string) => {
        if (categoryId === null) {
            context.setBlog(allBlogs);
        } else {
            const filteredBlogs = allBlogs.filter(
                (blog: Blog) => blog.category.id === categoryId
            );
            context.setBlog(filteredBlogs);
        }
    };

    if (Object.keys(props).length === 0) {
        return (
            <Error
                errorCode={Strings.INTERNAL_SERVER_ERROR}
                errorMessage={Strings.INTERNAL_SERVER_ERROR_MESSAGE}
                errorImage={errorImage}
            />
        );
    }
    return (
        <main className={styles.home}>
            {/* categories */}
            <section>
                <ul className={styles.home__categories}>
                    <li
                        className={styles['home__categories-item']}
                        key={Strings.ALL_CATEGORY_BUTTON}
                    >
                        <CategoryButton
                            name={Strings.ALL_CATEGORY_BUTTON}
                            handleClick={() => filterBlog(null)}
                        />
                    </li>
                    {categories.map((category: Category) => (
                        <li
                            className={styles['home__categories-item']}
                            key={category.name}
                        >
                            <CategoryButton
                                name={category.name}
                                handleClick={() => filterBlog(category.id)}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            {/* blogs */}
            {blogs.length === 0 ? (
                <NoBlog />
            ) : (
                <article className={styles.home__blogs}>
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
                </article>
            )}
        </main>
    );
}

/**
 * ブログの一覧を返す。
 *
 * @return {Promise<{props: {blogs: any, categories: any}}>} ブログとカテゴリーの一覧
 */
export const getStaticProps = async () => {
    try {
        // APIでブログの一覧を取得する
        const blogs = await client.get({
            endpoint: 'blogs',
            queries: {
                limit: Config.INITIAL_FETCHING_BLOG_COUNT,
                orders: '-createdAt',
            },
        });

        // APIでカテゴリの一覧を取得する
        const categories = await client.get({ endpoint: 'categories' });

        return {
            props: {
                fetchedBlogs: blogs.contents,
                categories: categories.contents,
            },
        };
    } catch (error) {
        return { props: {} };
    }
};

export default Home;
