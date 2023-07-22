import classes from './endMessage.module.css';

export default function EndMessage() {
    return (
        <div className={ classes.mainContainer }>
            We believe working with datasets needs to be{ ' ' }
            <span className={ classes.highlightedText }>Easy</span>.
        </div>
    );
}
