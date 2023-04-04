import classes from './loading.module.css';
import LoadingIcon from '../UI/loadingIcon/loadingIcon';

export default function Loading() {
    return (
        <div className={ classes.loading }>
            <LoadingIcon/>
            <h2>Loading</h2>
        </div>
    );
}

export async function LoadingScreen() {
    return (
        <div className={ classes.loadingScreen }>
            <div className={ classes.loading }>
                <LoadingIcon/>
                <h2>Loading</h2>
            </div>
        </div>
    );
}
