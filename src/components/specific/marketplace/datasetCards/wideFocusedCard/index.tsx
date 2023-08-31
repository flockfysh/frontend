import Link from 'next/link';

import DatasetTypeCard from '../../datasetTypeCard';

import { formatFileSize } from '@/helpers/formatting';

import classes from './styles.module.css';
import Avatar from 'boring-avatars';
import { RandomGradientContainer } from '@/helpers/gradients';

export default function WideFocusedCard(props: HomepageDataset) {
    const gradientFunction = () => {
        const gradients = ['#92A1C6', '#146A7C'];
        return gradients[Math.round(Math.random() * 1)];
    };

    const gradientFunction2 = () => {
        const gradients = ['#F0AB3D', '#C271B4', '#C20D90'];
        return gradients[Math.round(Math.random() * 2)];
    };

    return (
        <RandomGradientContainer className={ classes.cardContainer }>
            <div className={ classes.header }>
                <div className={ classes.thumbnail }>
                    { props.icon && <img src={ props.icon?.url } alt="avatar" /> }
                </div>

                <DatasetTypeCard
                    className={ classes.typeContainer }
                    type={ props.type }
                />
            </div>

            <div
                className={ classes.image }
                style={ {
                    background:
                        'linear-gradient(' +
                        Math.round(Math.random() * 360) +
                        'deg, ' +
                        gradientFunction() +
                        ' ' +
                        Math.round(Math.random() * 30) +
                        '%,' +
                        gradientFunction2() +
                        ' ' +
                        Math.round(Math.random() * 35 + 70) +
                        '%)',
                } }
            />

            <div className={ classes.overlay } />

            <Link
                className={ classes.linkOverlay }
                href={ `/marketplace/${props._id}` }
            />

            <div className={ classes.datasetName }>{ props.name }</div>

            <div className={ classes.footer }>
                <div className={ classes.left }>
                    <Link
                        className={ classes.anchor }
                        href={ `/profile/${props.user.username}` }
                    >
                        {
                            props.user.profilePhoto ? 
                            (<img src={ props.user.profilePhoto?.url } alt="pfp" />) 
                            :
                                (
<Avatar
                                        size={ 32 }
                                        name={ props.user.username }
                                        variant="marble"
                                        colors={ [
                                            '#92A1C6',
                                            '#146A7C',
                                            '#F0AB3D',
                                            '#C271B4',
                                            '#C20D90',
                                        ] }
                                    />
)
                        }

                        <p>@{ props.user.username.slice(0, 16) }</p>
                    </Link>
                </div>

                <div className={ classes.right }>
                    <div className={ classes.infoContainer }>
                        <span className={ classes.infoContainerLabel }>
                            Items
                        </span>

                        <span className={ classes.infoContainerValue }>
                            { props.assetCounts.total }
                        </span>
                    </div>

                    <div className={ classes.infoContainer }>
                        <span className={ classes.infoContainerLabel }>Size</span>

                        <span className={ classes.infoContainerValue }>
                            { formatFileSize(props.size.total.total) }
                        </span>
                    </div>
                </div>
            </div>
        </RandomGradientContainer>
    );
}
