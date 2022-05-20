import Link from 'next/link';
import { InferGetStaticPropsType } from 'next';
import client from '../../lib/client';
import { CategoryButton } from '../components/index';
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
        <div className={styles.home}>
            <section className={styles['home-navigation']} />
            <section className={styles['home-contents']}>
                <ul className={styles['home-contents__categories']}>
                    {categories.map((category: Category) => (
                        <li className={styles['home-contents__category']}>
                            <CategoryButton
                                name={category.name}
                                handleClick={toTop}
                            />
                        </li>
                    ))}
                </ul>
                <ul>
                    {blogs.map((blog: Blog) => (
                        <li key={blog.id}>
                            <Link href={`/blog/${blog.id}`}>
                                <a>{blog.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
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
