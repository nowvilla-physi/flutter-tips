import React from 'react';
import styles from '../styles/Button.module.scss';

type Props = {
    name: string;
    handleClick: () => void;
};

function Button(props: Props) {
    const { name, handleClick } = props;
    return (
        <button className={styles.button} onClick={handleClick} type='button'>
            {name}
        </button>
    );
}

export default Button;
