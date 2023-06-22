import { ReactSVG } from 'react-svg';

import DatasetTypeCard from '../../DatasetTypeCard';

import clock from '@/icons/main/clock.svg';
import classes from './style.module.css';
import { formatFileSize } from '@/helpers/formatting';
import { dayjs } from '@/helpers/date';


export default function VerticalCard(props: HomepageDataset) {
    return (
        <div className={ classes.container }>
            <div className={ classes.contentContainer }>
                <div className={ classes.header }>
                    <DatasetTypeCard type={ props.type } className={ classes.typeCard }/>

                    <img src={ props.thumbnail?.url } alt="cover"/>

                    <div className={ classes.timeContainer }>
                        <ReactSVG src={ clock.src } className={ classes.clockIcon }/>
                        <p>{dayjs(props.updatedAt).fromNow()}</p>
                    </div>
                </div>

                <div className={ classes.middleSection }>
                    <h1>{props.name}</h1>
                    <p>@{props.user.username}</p>
                </div>

                {
                    props.price > 0 && (
                        <div className={ classes.priceContainer }>
                            <p>${props.price?.toFixed(2)}</p>
                        </div>
                    )
                }

                <div className={ classes.footer }>
                    <div className={ classes.footerCardContainer + (props.price > 0 ? ' ' + classes.paidShrink : '') }>
                        <h1>{props.assetCounts.total}</h1>
                        <p>Items</p>
                    </div>

                    <div className={ classes.footerCardContainer + (props.price > 0 ? ' ' + classes.paidShrink : '') }>
                        <h1>{formatFileSize(props.size.total.total)}</h1>
                        <p className={ classes.size }>Size</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
