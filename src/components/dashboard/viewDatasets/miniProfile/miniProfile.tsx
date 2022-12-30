import { Link } from 'react-router-dom';
import classes from './miniProfile.module.css';

type MiniProfileProps = {
    image: string;
    name: string;
    email: string;
};

export default function MiniProfile (props: MiniProfileProps) {
    return (
        <Link to="/dashboard/profile">
            <div className={ classes.mainDiv }>
                <img className={ classes.image } src={ props.image } alt="" />
                
                <div className={ classes.textInfo }>
                    <div className={ classes.name }>{ props.name }</div>
                    <div className={ classes.email }>{ props.email }</div>
                </div>
            </div>
        </Link>
        
    );
}
