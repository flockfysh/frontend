import { ReactSVG } from 'react-svg';

import Image from 'next/image';
import Link from 'next/link';

import DatasetTypeCard from '../../datasetTypeCard';

import { formatFileSize } from '@/helpers/formatting';
import { getDefaultDatasetThumbnail } from '@/helpers/defaults';
import { dayjs } from '@/helpers/date';

import clock from '@/icons/main/clock.svg';

import classes from './styles.module.css';

export default function VerticalPostCard(
    props: HomepagePost & {
        className?: string;
    },
) {
    return (
        <div className={ `${classes.container} ${props.className || ''}` }>
            <div className={ classes.contentContainer }>
                <div className={ classes.middleSection }>
                    <h1>{ props.name }</h1>
                    <p>@{ props.user.username.slice(0, 16) }</p>
                </div>

                <div className={ classes.footer }>
                    <div className={ classes.footerCardContainer }>
                        <p>Likes</p>

                        <h1>{ props.likes }</h1>
                    </div>

                    <div className={ classes.footerCardContainer }>
                        <p className={ classes.size }>Views</p>
                        <h1>{ props.views }</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
