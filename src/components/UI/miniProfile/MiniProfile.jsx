import classes from "./MiniProfile.module.css";

export default function MiniProfile ({image, name, email}) {
    return (
        <div className={ classes.mainDiv }>
            <img className={ classes.image } src={ image } alt="" />
            <div className={ classes.textInfo }>
                <div className={ classes.name }>{ name }</div>
                <div className={ classes.email }>{ email }</div>
            </div>
        </div>
    );
}
