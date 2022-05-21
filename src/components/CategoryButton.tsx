import styles from '../styles/CategoryButton.module.scss';
import { Tag } from './index';

export type Props = {
    name: string;
    handleClick: () => void;
};

function CategoryButton(props: Props) {
    const { name, handleClick } = props;
    return (
        <button
            className={styles['category-button']}
            onClick={handleClick}
            type='button'
        >
            <Tag text={name} />
        </button>
    );
}

export default CategoryButton;
