import { ReactSVG } from 'react-svg';
import database from '@/icons/main/database.svg';
import clock from '@/icons/main/clock.svg';
import edit from '@/icons/main/edit-3.svg';
import square from '@/icons/main/square.svg';
import classes from './styles.module.css';
import dayjs from 'dayjs';

interface label {
    _id?: string;
    name: string;
    tool: string;
    color: string;
    isNew: boolean;
    isDeleted: boolean;
}

interface TEMP_RecipeCardProps {
    name: string;
    createdAt: Date;
    labels: Map<string, label>;
    id: string;
    usedDatasets: number;
    type: string;
}

export default function RecipeCard(props: TEMP_RecipeCardProps) {
    const dateCreatedAt = dayjs(props.createdAt).format('YYYY-MM-DD HH:mm');
    return (
        <li className={ classes.cardContainer }>
            {/* header */}
            <div className={ classes.headerWrapper }>
                {/* title */}
                <div className={ classes.headerTitleWrapper }>
                    <h2 className={ classes.headerTitle }>{props.name}</h2>
                    <small className={ classes.headerSubtitle }>ID: {props.id}</small>
                </div>

                {/* base data */}
                <div className={ classes.headerBaseData }>
                    {/* datasets data */}
                    <div className={ classes.headerBaseDataContent }>
                        <ReactSVG src={ database.src }></ReactSVG>
                        <small>Used in: <strong>{props.usedDatasets}</strong> Datasets</small>
                    </div>

                    {/* type */}
                    <div className={ classes.headerBaseDataType }>
                        <span className={ classes.headerBaseDataTypeContent }>{props.type}</span>
                    </div>

                    {/* created at */}
                    <div className={ classes.headerBaseDataContent }>
                        <ReactSVG src={ clock.src }></ReactSVG>
                        <small>Created At: {dateCreatedAt} UTC</small>
                    </div>
                </div>
            </div>

            {/* tags */}
            <div className={ classes.tagsAndActionsWrapper }>
                {/* tags */}
                <div className={ classes.tagsWrapper }>
                    {Array.from(props.labels.entries()).map(function transformEntry([clientSideUuid, label]) {
                        return (
                            <div key={ clientSideUuid } className={ classes.tagsItem }>
                                {/* switch between icons */}
                                <ReactSVG src={ square.src } className={ classes.tagsItemIcon }></ReactSVG>
                                <span>{label.name}</span>
                            </div>
                        );
                    })}
                </div>

                {/* actions */}
                <div className={ classes.actionsWrapper }>
                    <div className={ classes.actionEdit }>
                        <ReactSVG src={ edit.src }></ReactSVG>
                    </div>
                </div>
            </div>
        </li>
    );
}
