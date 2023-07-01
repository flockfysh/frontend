import Link from 'next/link';
import Image from 'next/image';

import ProfileCard from '@/components/specific/marketplace/profileCard';

import { formatFileSize } from '@/helpers/formatting';
import { getDefaultDatasetThumbnail } from '@/helpers/defaults';

import classes from './styles.module.css';

export default function FocusedDataset(props: HomepageDataset) {
    return (
        <div className={classes.focusedDatasetSection}>
            <div className={classes.focusedDatasetBackground}>
                <Image
                    className={classes.focusedDatasetBackgroundImage}
                    src={
                        props.thumbnail?.url ??
                        getDefaultDatasetThumbnail(props.type)
                    }
                    fill={true}
                    alt="Dataset background"
                />
            </div>

            <div className={classes.overlay} />

            <Link
                className={classes.linkOverlay}
                href={`/marketplace/${props._id}`}
            />

            <h1 className={classes.title}>{props.name}</h1>

            <div className={classes.footer}>
                <div className={classes.leftContainer}>
                    <div className={classes.datasetHeaderInfoCard}>
                        <h2>Total Images</h2>

                        <div className={classes.infoCardBottomContainer}>
                            <p>{props.assetCounts.total}</p>
                        </div>
                    </div>

                    <div className={classes.datasetHeaderInfoCard}>
                        <h2>Dataset Size</h2>

                        <div className={classes.infoCardBottomContainer}>
                            <p>{formatFileSize(props.size.total.total)}</p>
                        </div>
                    </div>
                </div>

                <div className={classes.rightContainer}>
                    <ProfileCard
                        className={classes.profileCard}
                        profilePicture={props.user.profilePhoto?.url ?? ''}
                        username={props.user.username}
                    />
                </div>
            </div>
        </div>
    );
}
