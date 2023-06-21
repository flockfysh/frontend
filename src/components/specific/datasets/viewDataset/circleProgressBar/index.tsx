import classes from './styles.module.css';

interface IProps {
    value: number;
    size?: number;
}

export const CircleProgressBar: React.FC<IProps> = (props) => {
    const size = (props.size ?? 120);
    const strokeWidth = 10;
    const center = size / 2;
    const radius = center - strokeWidth;
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = dashArray * ((100 - props.value) / 100);

    return (
        <svg width={ size } height={ size }>
            <circle
                cx={ center }
                cy={ center }
                r={ radius }
                fill="none"
                stroke="#404040"
                strokeWidth={ strokeWidth }
            />
            <circle
                cx={ center }
                cy={ center }
                r={ radius }
                fill="none"
                stroke="var(--primary1-400)"
                strokeWidth={ strokeWidth }
                strokeDasharray={ dashArray }
                strokeDashoffset={ dashOffset }
                transform={ `rotate(-90 ${center} ${center})` }
            />
            <text
                x={ center }
                y={ center - 7.5 }
                textAnchor="middle"
                dominantBaseline="middle"
                className={ classes.percentage }
                fill="var(--primary1-100)"
            >
                {`${props.value}%`}
            </text>
            <text
                x={ center }
                y={ center + 12.5 }
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--primary1-100)"
                fontSize="12"
            >
                completed
            </text>
        </svg>
    );
};
