import { ReactSVG } from 'react-svg';
import folder from '@/icons/main/folder.svg';
import clock from '@/icons/main/clock.svg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import classes from './styles.module.css';

dayjs.extend(relativeTime);

const tagColor: string[] = [
    'var(--primary2-300)',
    'var(--success-500)',
];

export default function DatasetCard(props: Dataset) {
    const dateDiff = dayjs(props.createdAt).fromNow();

    return (
        <li className={ classes.card }>
            <div className={ classes.firstRow }>
                <ReactSVG src={ folder.src }></ReactSVG>
                <h2>{props.name}</h2>
            </div>
            <div className={ classes.cardInfo }>
                <div className={ classes.firstInfoRow }>
                    <div className={ classes.assetCountText }>
                        <span className={ classes.assetCount }>{props.numAssets}</span>
                        <span>Assets</span>
                    </div>
                    <div className={ classes.lastUpdated }>
                        <ReactSVG src={ clock.src }></ReactSVG>
                        <span>{dateDiff}</span>
                    </div>

                </div>
                <div>
                    <p>
                        {props.description}
                    </p>
                </div>
                <ul className={ classes.tagBadges }>
                    {props.tags.map((tag, index) => {
                        return (
                            <li className={ classes.badge } style={ {
                                background: tagColor[index]
                            } } key={ index }>{tag}</li>
                        );
                    })}
                </ul>
            </div>
        </li>
    );
}
