import Image from 'next/image';
import Link from 'next/link';

import DatasetTypeCard from '../../datasetTypeCard';

import { formatFileSize } from '@/helpers/formatting';
import { getDefaultDatasetThumbnail } from '@/helpers/defaults';

import classes from './styles.module.css';

export default function WideFocusedCard(props: HomepageDataset) {
    return (
        <div className={ classes.cardContainer }>
            <div className={ classes.header }>
                <div className={ classes.thumbnail }>
                    { props.icon && <img src={ props.icon?.url } alt="avatar"/> }
                </div>

                <DatasetTypeCard
                    className={ classes.typeContainer }
                    type={ props.type }
                />
            </div>

            <Image
                fill={ true }
                alt="Dataset thumbnail"
                className={ classes.image }
                src={
                    props.thumbnail?.url ??
                    getDefaultDatasetThumbnail(props.type).src
                }
            />

            <div className={ classes.overlay } />
            
            <Link
                className={ classes.linkOverlay }
                href={ `/marketplace/${props._id}` }
            />
            
            <div className={ classes.datasetName }>{ props.name }</div>

            <div className={ classes.footer }>
                <div className={ classes.left }>
                    <img src={ props.user.profilePhoto?.url } alt="pfp"/>

                    <p>@{ props.user.username.slice(0, 16) }</p>
                </div>

                <div className={ classes.right }>
                    <div className={ classes.infoContainer }>
                        <span className={ classes.infoContainerLabel }>
                            Items
                        </span>

                        <span className={ classes.infoContainerValue }>
                            { props.assetCounts.total }
                        </span>
                    </div>

                    <div className={ classes.infoContainer }>
                        <span className={ classes.infoContainerLabel }>Size</span>

                        <span className={ classes.infoContainerValue }>
                            { formatFileSize(props.size.total.total) }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
