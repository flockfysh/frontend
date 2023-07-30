import { ReactSVG } from 'react-svg';

import image from '@/icons/main/image.svg';

import classes from './styles.module.css';

export default function DatasetTypeCard(props: {
    type: string;
    className?: string;
}) {

    return (
        <div
            className={
                (!props.className ? '' : props.className + ' ') +
                classes.datasetTypeContainer
            }
        >
            <ReactSVG src={ image.src } className={ classes.icon } />

            <span />

            <p>{ props.type.toUpperCase() }</p>
        </div>
    );
}
