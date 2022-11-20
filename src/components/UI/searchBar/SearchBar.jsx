import classes from './SearchBar.module.css';
import Icon from '../../../images/icons/search.svg';

export default function SearchBar ({placeHolder, onChangeLambda}) {
    return (
        <div className={ classes.container }>
            <input type="text" placeholder={ placeHolder } />
            <img src={ Icon } alt="" />
        </div>
    );
}