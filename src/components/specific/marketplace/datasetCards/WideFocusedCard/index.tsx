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

const TEST_URL = 'https://s3-alpha-sig.figma.com/img/efef/125a/480e2d2c1254490a3725b0c0a6c45edb?Expires=1686528000&Signature=AgfEYGXZwk4fKJ03f07hg2Ju2mrDjOv30qZrB~za0-5tvgVea1lN-WzcBdMouigAt6eWY3FUhb8bU~mwAfKLZyItadlOizm08hutx60lQPUsHv2Nxfv6mnqoSaqnuYibbuTn9UK1X0V7C8UT2CWM5EXILs~vsixZ9E2NeuRlIWbz8~xKezY2q~b~YB-a17Og8pRBOBoZNR6tGEsEBlI7CnLxXDlN4fwqIn~JdBUQtPxKtT3O2znDe2-S5W-A0Tpeuv8yHeRTL1lx1hVBKsKw69zumbIaoGEDHJoAk5n1lwUDw4Yi3bMXwY8QQBNWtn~TFxlPVJdZOTAPXR~ivi7pWQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

export default function WideFocusedCard(props: WideFocusedCardProps) {
    return (
        <div className={ classes.cardContainer }>
            <div className={ classes.header }>
                <div className={ classes.thumbnail }>
                    <img src={ props.avatar } alt="avatar"/>
                </div>

                <DatasetTypeCard className={ classes.typeContainer } type={ props.type }/>
            </div>
            <img className={ classes.image } src={ TEST_URL }></img>
            <div className={ classes.overlay }></div>
            <div className={ classes.datasetName }>{props.name}</div>

            <div className={ classes.footer }>
                <div className={ classes.left }>
                    <img
                        src="https://s3-alpha-sig.figma.com/img/e182/5c4b/15ad61311df48a8ac412367e9229eff2?Expires=1686528000&Signature=JnhQXDAcac3h42gK90KMVVwO3bNqQfopveEVire8BdnqE3ugdcaEbZZNPqTyUOaSDPFVuO4GEZxGJFNBIMnJ1~WmLO-auhZ8QQBNJwRjQLvBPrY2s0agLL0P7iss9bxLPqs-MwXhdsi0IWx-x8KLBd8luJfyeQ0JTEnR3xIzZDZGTKD6MrhemD7YBK9wK7Kgs7viopmRSCEFo3ETxSuy-kANz7AXgEigfoh-RntFQ8-nEJUc8Ne9thw5nA~n3EX4LaQzb0NdDShTPFh5CPGfjMaVKHxSeSxwXWpRMdb-FbuNe3hRkASbx3riRJ6g5JwTiyESxYql8QAGdQ2QNejYnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        alt="pfp"/>

                    <p>@{props.owner}</p>
                </div>

                <div className={ classes.right }>
                    <div className={ classes.infoContainer }>
                        <p>Items</p>

                        <h1>{props.numItems}</h1>
                    </div>

                    <div className={ classes.infoContainer }>
                        <p>Size</p>

                        <h1>{props.size} GB</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
