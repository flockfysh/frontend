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
                        <ProfileCard username={ props.owner } profilePicture="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
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
