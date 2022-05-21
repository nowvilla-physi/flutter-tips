import { InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import client from '../../lib/client';
import { BlogItem, CategoryButton, Error } from '../components/index';
import { Blog, Category } from '../models/types';
import styles from '../styles/Home.module.scss';
import * as Strings from '../constants/strings';
import errorImage from '../../public/images/ic_500.png';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// 初期に取得するブログの最大件数
const INITIAL_LIMIT = 1000;

function Home(props: Props) {
    // getStaticPropsで取得したデータ
    const { allBlogs, categories } = props;

    // ブログの一覧
    const [blogs, setBlogs] = useState<Blog[]>(allBlogs);

    /**
     * 指定したカテゴリーでブログをフィルターする。
     *
     * @param categoryId カテゴリーId
     */
    const filterBlog = (categoryId: string) => {
        if (categoryId === null) {
            setBlogs(allBlogs);
        } else {
            const filteredBlogs = allBlogs.filter(
                (blog: Blog) => blog.category.id === categoryId
            );
            setBlogs(filteredBlogs);
        }
    };

    return Object.keys(props).length === 0 ? (
        <Error
            errorCode={Strings.INTERNAL_SERVER_ERROR}
            errorMessage={Strings.INTERNAL_SERVER_ERROR_MESSAGE}
            errorImage={errorImage}
        />
    ) : (
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
        </section>
    );
}

/**
 * ブログの一覧を返す(画面表示に呼ばれる)。
 *
 * @return {Promise<{props: {blogs: any, categories: any}}>} ブログとカテゴリーの一覧
 */
export const getStaticProps = async () => {
    try {
        // APIでブログの一覧を取得する
        const blogs = await client.get({
            endpoint: 'blogs',
            queries: { limit: INITIAL_LIMIT },
        });

        // APIでカテゴリの一覧を取得する
        const categories = await client.get({ endpoint: 'categories' });
        return {
            props: {
                allBlogs: blogs.contents,
                categories: categories.contents,
            },
        };
    } catch (error) {
        return { props: {} };
    }
};

export default Home;
