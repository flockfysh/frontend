import DatasetTypeCard from '../../datasetTypeCard';
import ProfileCard from '../../profileCard';

import classes from './styles.module.css';
import Image from 'next/image';

export default function VerticalCollectionCard(props: HomepageCollection) {
    return (
        <div className={classes.container}>
            <Image
                fill={true}
                src={props.thumbnail?.url ?? ''}
                alt="Thumbnail"
                className={classes.thumbnail}
            />


            <div className={classes.contentContainer}>
                <div className={classes.header}>
                    <img src={props.icon?.url} alt="Avatar"/>

                    <div className={classes.contentContainer}>
                        <div className={classes.header}>
                            <img
                                src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="Avatar"
                            />

                            <DatasetTypeCard type={props.type} className={classes.typeCard}/>
                        </div>

                        <div className={classes.middleSection}>
                            <h1>{props.name}</h1>

                            <div className={classes.profileCardContainer}>
                                <ProfileCard

                                    className={classes.profileCard}
                                    username={props.user.username}
                                    profilePicture={props.user.profilePhoto?.url ?? ''}
                                />
                            </div>
                        </div>

                        <div className={classes.footer}>
                            <div className={classes.infoContainer}>
                                <p className={classes.infoHeader}>Datasets</p>
                                <p className={classes.info}>{props.itemCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
