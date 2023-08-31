import Link from 'next/link';
import DatasetTypeCard from '../../datasetTypeCard';

import classes from './styles.module.css';
import { RandomGradientComponent } from '@/helpers/gradients';

export default function VerticalCollectionCard(props: any) {
    
    const tags = props.datasetsByTags.map((item:any) => item.type).filter((v:any, i:any, a:any) => a.indexOf(v) === i).join();



    return (
        <div className={ classes.container }>
            
            <RandomGradientComponent className= { classes.thumbnail }/>

            <div className={ classes.contentContainer }>
                <Link href= { `/collections/${props._id}` }>
                    <div className={ classes.header }>
                        <img
                            src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Avatar"
                        />

                        <DatasetTypeCard
                            type={ tags }
                            className={ classes.typeCard }
                        />
                    </div>

                    <div className={ classes.middleSection }>
                        <h1>{ props._id }</h1>

                        <div className={ classes.footer }>
                            <div className={ classes.infoContainer }>
                                <p className={ classes.infoHeader }> Datasets </p>
                                <p className={ classes.info }>{ props.countByTags }</p>
                            </div>

                        
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
