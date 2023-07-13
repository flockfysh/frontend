import { ReactSVG } from 'react-svg';
import classes from './styles.module.css';

type IconInputTypes = {
    name: string;
    placeholder: string;
    icon: any;
    register: Function;
    errors: any
};

function IconInput({ name, placeholder, icon, register, errors }: IconInputTypes) {
    return (
        <div className={ classes.eachLinkDiv }>
            <ReactSVG
                src={ icon.src }
                className={ classes.icons + ' ' + classes.inputIcons }
            />

            <input
                className={ classes.linkInput }
                placeholder={ placeholder }
                {
                    ...register(
                        name,
                        {
                            pattern: {
                                    value: /^https:\/\//,
                                    message: 'URL must start with "https://"'
                                }
                        }
                    )
                }
            />
            { errors && errors[name] && <p className={ classes.errors }>{ errors[name].message }</p> }
        </div>
    );
}

export default IconInput;
