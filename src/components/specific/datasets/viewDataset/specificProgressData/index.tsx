import classes from './styles.module.css';

export interface ProgressDataProps {
    value: string;
    label: string;
}

export default function SpecificProgressData(props: ProgressDataProps) {
    return (
        <div className={ classes.dataItem }>
            <span className={ classes.dataValue }>{ props.value }</span>
            <small className={ classes.dataLabel }>{ props.label }</small>
        </div>
    );
}
