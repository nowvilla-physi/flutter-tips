import styles from '../styles/Tooltip.module.scss';

type Props = {
    text: string;
    isVisible: boolean;
};

function Tooltip(props: Props) {
    const { text, isVisible } = props;
    return !isVisible ? (
        <div />
    ) : (
        <div className={styles.tooltip}>
            <span>{text}</span>
        </div>
    );
}

export default Tooltip;
