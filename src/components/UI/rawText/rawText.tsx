import classes from './rawText.module.css';

export interface RawTextProps {
    children?: React.ReactNode;
}

export function RawText(props: RawTextProps) {
    return <div className={ classes.container }>{ props.children }</div>;
}
