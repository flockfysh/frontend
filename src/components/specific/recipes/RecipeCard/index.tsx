import { ReactSVG } from 'react-svg';
import database from '@/icons/main/database.svg';
import clock from '@/icons/main/clock.svg';
import edit from '@/icons/main/edit-3.svg';
import square from '@/icons/main/square.svg';
import polygon from '@/icons/main/recipe-icon-2.svg';
import circle from '@/icons/main/circle.svg';
import line from '@/icons/main/slash-divider.svg';
import classes from './styles.module.css';
import dayjs from 'dayjs';
import { StaticImageData } from 'next/image';

const iconMapping: Record<Flockfysh.AnnotationTool, StaticImageData> = {
    line, polygon, ellipse: circle, boundingBox: square,
};

interface Label {
    _id?: string;
    name: string;
    tool: Flockfysh.AnnotationTool;
    color: string;
    isNew: boolean;
    isDeleted: boolean;
}

export interface TEMP_RecipeCardProps {
    name: string;
    createdAt: Date;
    labels: Map<string, Label>;
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
                                <ReactSVG src={ iconMapping[label.tool].src } className={ classes.tagsItemIcon }></ReactSVG>
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
