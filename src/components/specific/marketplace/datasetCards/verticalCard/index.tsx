import {} from 'react';
import { ReactSVG } from 'react-svg';

import Image from 'next/image';
import Link from 'next/link';

import DatasetTypeCard from '../../datasetTypeCard';

import { formatFileSize } from '@/helpers/formatting';
import { getDefaultDatasetThumbnail } from '@/helpers/defaults';
import { dayjs } from '@/helpers/date';

import clock from '@/icons/main/clock.svg';

import classes from './styles.module.css';

export default function VerticalCard(props: HomepageDataset) {
    return (
        <div className={ classes.container }>
            <div className={ classes.contentContainer }>
                <div className={ classes.header }>
                    <DatasetTypeCard type={ props.type } className={ classes.typeCard } />

                    <div className={ classes.imageContainer }>
                        <Image
                            fill={ true }
                            className={ classes.image }
                            src={ props.thumbnail?.url ?? getDefaultDatasetThumbnail(props.type).src }
                            alt="cover"
                        />
                    </div>

                    <div className={ classes.timeContainer }>
                        <ReactSVG src={ clock.src } className={ classes.clockIcon } />
                        <p>{ dayjs(props.updatedAt).fromNow() }</p>
                    </div>
                </div>

                <div className={ classes.middleSection }>
                    <h1>{ props.name }</h1>
                    <p>@{ props.user.username.slice(0, 15) }</p>
                </div>

                <Link className={ classes.linkOverlay } href={ `/marketplace/${ props._id }` } />

                {
                    props.price > 0 && (
                        <div className={ classes.priceContainer }>
                            <p>${ props.price?.toFixed(2) }</p>
                        </div>
                    )
                }

                <div className={ classes.footer }>
                    <div className={ classes.footerCardContainer + (props.price > 0 ? ' ' + classes.paidShrink : '') }>
                        <p>Items</p>

                        <h1>{ props.assetCounts.total }</h1>
                    </div>

                    <div className={ classes.footerCardContainer + (props.price > 0 ? ' ' + classes.paidShrink : '') }>
                        <p className={ classes.size }>Size</p>
                        <h1>{ formatFileSize(props.size.total.total) }</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
