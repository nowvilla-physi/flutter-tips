import styles from '../styles/Tag.module.scss';

type Props = {
    text: string;
};

function Tag(props: Props) {
    const { text } = props;

    return <span className={styles.tag}>{text}</span>;
}

export default Tag;
