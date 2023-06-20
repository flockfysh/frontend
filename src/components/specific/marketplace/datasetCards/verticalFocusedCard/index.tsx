import ProfileCard from '../../profileCard';
import DatasetTypeCard from '../../datasetTypeCard';

import classes from './style.module.css';

type VerticalFocusedCardProps = {
    name: string;
    avatar: string;
    owner: string;
    numDatasets: number;
    type: string;
}

export default function VerticalFocusedCard(props: VerticalFocusedCardProps) {
    return (
        <div className={ classes.container }>
            <div className={ classes.contentContainer }>
                <div className={ classes.header }>
                    <img src={ props.avatar } alt="avatar" />
                </div>

                <div className={ classes.middleSection }>
                    <DatasetTypeCard type={ props.type } className={ classes.typeCard } />
                    <h1>{ props.name }</h1>
                </div>

                <div className={ classes.footer }>
                    <p>{ props.numDatasets } Datasets</p>

                    <div className={ classes.profileCardContainer }>
                        <ProfileCard username={ props.owner } profilePicture="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                    </div>

                </div>
            </div>
        </div>
    );
}
