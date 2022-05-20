import { InferGetStaticPropsType } from 'next';
import client from '../../lib/client';
import { BlogItem, CategoryButton } from '../components/index';
import { Blog, Category } from '../models/types';
import styles from '../styles/Home.module.scss';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const toTop = () => {
    // TODO
    console.log('###');
};

function Home(props: Props) {
    const { blogs, categories } = props;
    return (
        <section className={styles.home}>
            {/* categories */}
            <section>
                <ul className={styles.home__categories}>
                    {categories.map((category: Category) => (
                        <li className={styles['home__categories-item']}>
                            <CategoryButton
                                name={category.name}
                                handleClick={toTop}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            {/* blogs */}
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
        </section>
    );
}

/**
 * ブログの一覧を返す。
 *
 * @return {Promise<{props: {blogs: any, categories: any}}>} ブログの一覧
 */
export const getStaticProps = async () => {
    const blogs = await client.get({ endpoint: 'blogs' });
    const categories = await client.get({ endpoint: 'categories' });
    return {
        props: { blogs: blogs.contents, categories: categories.contents },
    };
};

export default Home;
