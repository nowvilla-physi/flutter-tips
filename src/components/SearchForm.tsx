import { useContext, useState } from 'react';
import styles from '../styles/SearchForm.module.scss';
import * as Strings from '../constants/strings';
import { blogContext } from '../hooks/useBlog';
import { Blog } from '../models/types';

function SearchForm() {
    const [text, setText] = useState('');
    const context = useContext(blogContext);
    const { blogs } = context;
    const { allBlogs } = context;

    const search = () => {
        if (text.trim() === '') {
            if (blogs.length !== allBlogs.length) {
                context.setBlog(allBlogs);
            }
        } else {
            const searchTexts = text.split(' ');
            const searchedBlogs = allBlogs.filter((blog: Blog) =>
                isMatchText(
                    blog.title,
                    blog.content,
                    blog.category.name,
                    searchTexts
                )
            );
            context.setBlog(searchedBlogs);
        }
    };

    const isMatchText = (
        title: string,
        content: string,
        category: string,
        searchTexts: string[]
    ) => {
        let isMatched: boolean = false;
        // eslint-disable-next-line consistent-return
        searchTexts.forEach((searchText: string) => {
            isMatched =
                title.includes(searchText) ||
                content.includes(searchText) ||
                category.includes(searchText);
            if (isMatched) {
                return isMatched;
            }
        });
        return isMatched;
    };

    return (
        <div className={styles['search-form']}>
            <input
                className={styles['search-form__text']}
                placeholder={Strings.SEARCH_FORM_PLACEHOLDER}
                value={text}
                onChange={(event) => setText(event.target.value)}
            />
            <button
                type='button'
                className={styles['search-form__button']}
                onClick={search}
            >
                {Strings.SEARCH_FORM_BUTTON}
            </button>
        </div>
    );
}

export default SearchForm;
