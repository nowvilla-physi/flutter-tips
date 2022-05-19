import styles from '../styles/SearchForm.module.scss';
import * as Strings from '../constants/strings';

function SearchForm() {
    return (
        <form action=''>
            <div className={styles['search-form']}>
                <input
                    className={styles['search-form__text']}
                    placeholder={Strings.SEARCH_FORM_PLACEHOLDER}
                />
                <input
                    type='submit'
                    value={Strings.SEARCH_FORM_BUTTON}
                    className={styles['search-form__button']}
                />
            </div>
        </form>
    );
}

export default SearchForm;
