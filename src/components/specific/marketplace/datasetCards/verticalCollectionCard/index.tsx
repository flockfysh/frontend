import DatasetTypeCard from '../../datasetTypeCard';
import ProfileCard from '../../profileCard';

import classes from './styles.module.css';

export default function VerticalCollectionCard(props: HomepageCollection) {
    const gradientFunction = () => {
        const gradients = ['#92A1C6', '#146A7C'];
        return gradients[Math.round(Math.random() * 1)];
    };

    const gradientFunction2 = () => {
        const gradients = ['#F0AB3D', '#C271B4', '#C20D90'];
        return gradients[Math.round(Math.random() * 2)];
    };

    return (
        <div className={ classes.container }>
            <div
                className={ classes.thumbnail }
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

            <div className={ classes.contentContainer }>
                <div className={ classes.header }>
                    <img
                        src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt="Avatar"
                    />

                    <DatasetTypeCard
                        type={ props.type }
                        className={ classes.typeCard }
                    />
                </div>

                <div className={ classes.middleSection }>
                    <h1>{ props.name }</h1>

                    <div className={ classes.footer }>
                        <div className={ classes.infoContainer }>
                            <p className={ classes.infoHeader }>Datasets</p>
                            <p className={ classes.info }>{ props.itemCount }</p>
                        </div>

                        <div className={ classes.profileCardContainer }>
                            <ProfileCard
                                className={ classes.profileCard }
                                username={ props.user.username }
                                profilePicture={ props.user.profilePhoto?.url ?? '' }
                                showMenu={ false }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
