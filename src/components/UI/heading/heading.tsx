import classes from './heading.module.css';

type HeaderProps = {
	beforeSpan: string;
	span: string;
	afterSpan: string;
};

export default function Header(props: HeaderProps) {
	return (
		<h1 className={classes.header}>
			{props.beforeSpan}

			<span className={classes.span}>{props.span}</span>

			{props.afterSpan}
		</h1>
	);
}
