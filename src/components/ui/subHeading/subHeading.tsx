import classes from './subHeading.module.css';

type SubHeadingProps = {
    beforeSpan: string;
    span: string;
    afterSpan: string;
};

export default function SubHeading(props: SubHeadingProps) {
    return (
        <h2 className={ classes.subHeading }>
            { props.beforeSpan }

            <span className={ classes.span }>{ props.span }</span>

            { props.afterSpan }
        </h2>
    );
}
