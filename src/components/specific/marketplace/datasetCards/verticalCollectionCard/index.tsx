import DatasetTypeCard from '../../DatasetTypeCard';
import ProfileCard from '../../ProfileCard';

import classes from './styles.module.css';
import Image from 'next/image';

export default function VerticalCollectionCard(props: HomepageCollection) {
    return (
        <div className={ classes.container }>
            <Image fill={ true } src={ props.thumbnail?.url ?? '' } alt={ 'Thumbnail' }
                   className={ classes.thumbnail }></Image>
            <div className={ classes.contentContainer }>
                <div className={ classes.header }>
                    <img src={ props.icon?.url } alt="Avatar"/>
                    <DatasetTypeCard type={ props.type } className={ classes.typeCard }/>
                </div>

                <div className={ classes.middleSection }>
                    <h1>{props.name}</h1>

                    <div className={ classes.profileCardContainer }>
                        <ProfileCard className={ classes.profileCard } username={ props.user.username }
                                     profilePicture={ props.user.profilePhoto ?? '' }/>
                    </div>
                </div>

                <div className={ classes.footer }>
                    <div className={ classes.infoContainer }>
                        <p className={ classes.infoHeader }>Datasets</p>
                        <p className={ classes.info }>{props.itemCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
