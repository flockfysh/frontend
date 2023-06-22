import DatasetTypeCard from '../../DatasetTypeCard';

import classes from './styles.module.css';
import { formatFileSize } from '@/helpers/formatting';


const TEST_URL = 'https://s3-alpha-sig.figma.com/img/f047/4a98/8b4d07ab312672f12d10b21fec40327c?Expires=1687737600&Signature=qHIX10Eb9MJf3iZOWiJZ8vsQ003vAaoSmRJQ3Uc49mHCZ5ZpDqHbyMDucJo0KG7afWq2El18GuwiyojHjfaExSHMybwUNqksO~YO2C5FCZoVdzt9j0Lyak4-zA840nJDyWsdh21O85b9PTMSVq2vTcR9rGcO22Ogb-w0Iy3JIbdGm3cVbwOo5JScjvLWwwdBaLJ9qyrSvQ60ldOM9DhBcia9Te1eQX7iS7jJIdF6fTV96XIbOCqp6pNQJzvNWVETibnvYJbP4jXon-C0fdWHsjhrrQw3mcUu59s38W7Kcbe1QJyFqwg-1w8Riro7K3Z1TiKEi3D4~ZcTgdhsQNwhKQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

export default function WideFocusedCard(props: HomepageDataset) {
    return (
        <div className={ classes.cardContainer }>
            <div className={ classes.header }>
                <div className={ classes.thumbnail }>
                    <img src={ props.icon?.url } alt="avatar"/>
                </div>

                <DatasetTypeCard className={ classes.typeContainer } type={ props.type }/>
            </div>
            <img className={ classes.image } src={ props.thumbnail?.url }></img>
            <div className={ classes.overlay }></div>
            <div className={ classes.datasetName }>{props.name}</div>

            <div className={ classes.footer }>
                <div className={ classes.left }>
                    <img
                        src="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        alt="pfp"/>

                    <p>@{props.user.username}</p>
                </div>

                <div className={ classes.right }>
                    <div className={ classes.infoContainer }>
                        <span className={ classes.infoContainerLabel }>Items</span>

                        <span className={ classes.infoContainerValue }>{props.assetCounts.total}</span>
                    </div>

                    <div className={ classes.infoContainer }>
                        <span className={ classes.infoContainerLabel }>Size</span>

                        <span className={ classes.infoContainerValue }>{formatFileSize(props.size.total.total)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
