import classes from './label.module.css';

export default function Label(props: { text: string }) {
    return (
        <div className={ classes.label }>
            <div className={ classes.colorDot } />
            <p className={ classes.labelText }>{ props.text }</p>
        </div>
    );
}
