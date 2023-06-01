import DatasetTypeCard from '../../datasetTypeCard';

import classes from './styles.module.css';

type WideFocusedCardProps = {
    name: string;
    owner: string; // TODO: replace with User type
    numItems: number; // TODO: replace with datasetfield
    avatar?: string;
    size: number;
    type: string;
}

export default function WideFocusedCard(props: WideFocusedCardProps) {
    return (
        <div className={ classes.cardContainer }>
            <div className={ classes.header }>
                <div className={ classes.avatar }>
                    <img src={ props.avatar } alt="avatar" />
                </div>

                <DatasetTypeCard className={ classes.typeContainer } type={ props.type } />
            </div>

            <div className={ classes.datasetName }>{ props.name }</div>

            <div className={ classes.footer }>
                <div className={ classes.left }>
                    <img src="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="pfp" />

                    <p>@{ props.owner }</p>
                </div>

                <div className={ classes.right }>
                    <div className={ classes.infoContainer }>
                        <p>Items</p>

                        <h1>{ props.numItems }</h1>
                    </div>

                    <div className={ classes.infoContainer }>
                        <p>Size</p>

                        <h1>{ props.size } GB</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
