import Link from 'next/link';
import { InferGetStaticPropsType } from 'next';
import client from '../../lib/client';
import { Blog } from '../models/blog';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Home({ blogs }: Props) {
    return (
        <div>
            <ul>
                {blogs.map((blog: Blog) => (
                    <li key={blog.id}>
                        <Link href={`/blog/${blog.id}`}>
                            <a>{blog.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * ブログの一覧を返す。
 *
 * @return {Promise<{props: {blogs: any}}>} ブログの一覧
 */
export const getStaticProps = async () => {
    const data = await client.get({ endpoint: 'blogs' });
    return { props: { blogs: data.contents } };
};

export default Home;
