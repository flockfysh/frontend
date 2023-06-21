import classes from './styles.module.css';

export default function DatasetTimeFilter(props: { options: string[], callback: (time: number) => void, selected: number }) {
    return (
        <div className={ classes.trendingFilterContainer }>
            {
                props.options.map(
                    (o, i) => (
                        <div key={ i } className={ classes.trendingFilterGrid + ' ' + (props.selected === i ? classes.selected : '') }>
                            <div>{ o }</div>
                        </div>
                    )
                )
            }
        </div>
    );
}
