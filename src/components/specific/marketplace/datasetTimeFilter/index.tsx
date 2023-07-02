import dayjs from 'dayjs';
import classes from './styles.module.css';

export default function DatasetTimeFilter(props: {
    options: [number, dayjs.ManipulateType][];
    callback: (time: number) => void;
    selected: number;
}) {
    return (
        <div className={ classes.trendingFilterContainer }>
            { props.options.map(([count, type], i) => (
                <button
                    key={ i }
                    onClick={ () => props.callback(i) }
                    className={
                        classes.trendingFilterGrid +
                        ' ' +
                        (props.selected === i ? classes.selected : '')
                    }
                >
                    <div>
                        { count }
                        { type[0] }
                    </div>
                </button>
            )) }
        </div>
    );
}
