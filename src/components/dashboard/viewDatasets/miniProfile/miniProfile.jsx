import { Link } from 'react-router-dom';
import classes from './miniProfile.module.css';

export default function MiniProfile ({image, name, email}) {
    return (
        <Link to="/dashboard/profile">
            <div className={ classes.mainDiv }>
                <img className={ classes.image } src={ image } alt="" />
                
                <div className={ classes.textInfo }>
                    <div className={ classes.name }>{ name }</div>
                    <div className={ classes.email }>{ email }</div>
                </div>
            </div>
        </Link>
        
    );
}
