import LoadingIcon from '../loadingIcon';

import classes from './loading.module.css';

export default function Loading() {
    return (
        <div className={ classes.loading }>
            <LoadingIcon />

            <h2>Loading</h2>
        </div>
    );
}

export function LoadingScreen() {
    return (
        <div className={ classes.loadingScreen }>
            <div className={ classes.loading }>
                <LoadingIcon />

                <h2>Loading</h2>
            </div>
        </div>
    );
}
