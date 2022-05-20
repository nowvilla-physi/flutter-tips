import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/IconButton.module.scss';

export type Props = {
    imagePath: any;
    url: string;
};

function IconButton(props: Props) {
    const { imagePath, url } = props;
    return (
        <div className={styles['icon-button']}>
            <Link href={url}>
                <a target='_blank'>
                    <Image
                        className={styles['icon-button__image']}
                        src={imagePath}
                        alt='アイコン'
                        width='28'
                        height='28'
                    />
                </a>
            </Link>
        </div>
    );
}

export default IconButton;
