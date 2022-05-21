import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/IconButton.module.scss';
import { Tooltip } from './index';

export type Props = {
    imagePath: any;
    url: string;
    text: string;
};

function IconButton(props: Props) {
    const { imagePath, url, text } = props;
    const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);

    return (
        <div
            className={styles['icon-button']}
            onMouseEnter={() => setIsVisibleTooltip(true)}
            onMouseLeave={() => setIsVisibleTooltip(false)}
        >
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
            <div className={styles['icon-button__tooltip']}>
                <Tooltip text={text} isVisible={isVisibleTooltip} />
            </div>
        </div>
    );
}

export default IconButton;
