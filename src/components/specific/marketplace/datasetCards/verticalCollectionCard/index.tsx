import DatasetTypeCard from '../../datasetTypeCard';
import ProfileCard from '../../profileCard';

import classes from './styles.module.css';

type VerticalCollectionCardProps = {
    name: string;
    avatar: string;
    owner: string;
    numDatasets: number;
    type: string;
    numContributors: number;
}

export default function VerticalCollectionCard(props: VerticalCollectionCardProps) {
    return (
        <div className={ classes.container }>
            <div className={ classes.contentContainer }>
                <div className={ classes.header }>
                    <img src={ props.avatar } alt="avatar" />
                    <DatasetTypeCard type={ props.type } className={ classes.typeCard } />
                </div>

                <div className={ classes.middleSection }>
                    <h1>{ props.name }</h1>
                    
                    <div className={ classes.profileCardContainer }>
                        <ProfileCard username={ props.owner } profilePicture="https://images.unsplash.com/photo-1531720414817-c690e57c5637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80" />
                    </div>
                </div>

                <div className={ classes.footer }>
                    <div className={ classes.infoContainer }>
                        <p className={ classes.infoHeader }>Datasets</p>
                        <p className={ classes.info }>{ props.numDatasets }</p>
                    </div>

                    <div className={ classes.infoContainer }>
                        <p className={ classes.infoHeader }>Contributors</p>
                        <p className={ classes.info + ' ' + classes.infoRight }>{ props.numContributors }</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
