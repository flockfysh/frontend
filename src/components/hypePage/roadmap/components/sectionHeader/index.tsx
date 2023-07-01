import classes from './index.module.css';

interface SectionHeaderProps {
    subHeader: string;
    header: string;
    body?: string;
}

export default function SectionHeader({ subHeader, header, body }: SectionHeaderProps) {
    return (
        <div className={ classes.headerContainer }>
            <div className={ classes.headerWrapper }>
                <h4 className={ classes.subHeader }>{subHeader}</h4>
                <h3 className={ classes.header }>{header}</h3>
                <p className={ classes.body }>{body}</p>
            </div>
        </div>
    );
}
