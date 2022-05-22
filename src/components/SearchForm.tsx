import { useState } from 'react';
import styles from '../styles/SearchForm.module.scss';
import * as Strings from '../constants/strings';

function SearchForm() {
    const [text, setText] = useState('');

    const search = () => {
        console.log(text);
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
