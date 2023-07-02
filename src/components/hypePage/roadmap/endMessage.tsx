import classes from './endMessage.module.css';

function EndMessage() {
    return (
        <div className={ classes.mainContainer }>
            We believe working with datasets needs to be <span className={ classes.highlightedText }>Easy</span>.
        </div>
    );
}

export default EndMessage;
