import { useContext, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { StaticImageData } from 'next/image';

import * as uuid from 'uuid';

import TextInput from '@/components/ui/input/textInput';
import { PopupModalContext } from '@/components/ui/modals/actionPopup';

import api from '@/helpers/api';

import link from '@/icons/main/link.svg';
import line from '@/icons/main/slash-divider.svg';
import polygon from '@/icons/main/recipe-icon-2.svg';
import pen from '@/icons/main/feather.svg';
import add from '@/icons/main/plus-circle.svg';
import Select from '@/components/ui/input/select';
import trash from '@/icons/main/trash-2.svg';
import lock from '@/icons/main/lock.svg';
import circle from '@/icons/main/circle.svg';
import square from '@/icons/main/square.svg';

import classes from './styles.module.css';

const iconMapping: Record<Flockfysh.AnnotationTool, StaticImageData> = {
    line,
    polygon,
    ellipse: circle,
    boundingBox: square,
};

interface ClientLabel {
    _id?: string;
    name: string;
    tag?: string;
    color: string;
    tool: Flockfysh.AnnotationTool;
    isNew: boolean;
    isModified: boolean;
    isDeleted: boolean;
}

interface RecipeFormProps {
    id?: string;
}

async function createRecipe(params: { name: string; labels: ClientLabel[] }) {
    const newRecipe = (
        await api.post<{ success: true; data: Flockfysh.Recipe }>(
            '/api/recipes',
            {
                name: params.name,
            }
        )
    ).data.data;

    const newRecipeId = newRecipe._id;

    for (const label of params.labels) {
        if (label.isNew) {
            await api.post<Flockfysh.Label>(
                `/api/recipes/${newRecipeId}/labels`,
                {
                    name: label.name,
                    color: label.color,
                    tool: label.tool,
                }
            );
        }
    }

    return true;
}

async function editRecipe(
    id: string,
    params: {
        name: string;
        labels: ClientLabel[];
    }
) {
    await api.patch(`/api/recipes/${id}/rename`, {
        name: params.name,
    });

    for (const label of params.labels) {
        if (label.isNew) {
            await api.post<Flockfysh.Label>(`/api/recipes/${id}/labels`, {
                name: label.name,
                color: label.color,
                tool: label.tool,
            });

            label.isNew = false;
            label.isModified = false;
        }
 else if (label.isModified) {
            if (!label._id) throw new Error('Missing label ID - cannot edit!');

            await api.patch(`/api/labels/${label._id}/name`, {
                name: label.name,
            });

            await api.patch(`/api/labels/${label._id}/tool`, {
                tool: label.tool,
            });

            await api.patch(`/api/labels/${label._id}/color`, {
                color: label.color,
            });

            label.isNew = false;
            label.isModified = false;
        }
 else if (label.isDeleted) {
            if (!label._id)
                throw new Error('Missing label ID - cannot delete!');

            await api.delete<Flockfysh.Label>(`/api/labels/${label._id}`);
        }
    }

    return true;
}

const ANNOTATION_TOOL_OPTIONS: {
    value: Flockfysh.AnnotationTool;
    label: string;
}[] = [
    {
        value: 'boundingBox',
        label: 'Bounding box',
    },
    {
        value: 'polygon',
        label: 'Polygon',
    },
    {
        value: 'ellipse',
        label: 'Ellipse',
    },
    {
        value: 'line',
        label: 'Line',
    },
];

const ANNOTATION_TOOL_FULL_OPTIONS = ANNOTATION_TOOL_OPTIONS.map((opt) => {
    return {
        value: opt.value,
        label: (
            <div className={ classes.labelTool }>
                <ReactSVG
                    className={ classes.labelToolIcon }
                    src={ iconMapping[opt.value].src }
                />

                <span>{ opt.label }</span>
            </div>
        ),
    };
});

export default function RecipeForm(props: RecipeFormProps) {
    const { close: closeForm } = useContext(PopupModalContext);

    const [name, setName] = useState('');
    const [immutable, setImmutable] = useState(false);

    const [{ labels }, setLabels] = useState<{
        labels: Map<string, ClientLabel>;
    }>({
        labels: new Map(),
    });

    useEffect(() => {
        async function load() {
            if (props.id) {
                const recipe = (
                    await api.get<Api.Response<Flockfysh.RecipeWithLabels>>(
                        `/api/recipes/${props.id}`,
                        {
                            params: {
                                expand: 'labels',
                            },
                        }
                    )
                ).data.data;

                setName(recipe.name);
                setImmutable(recipe.immutable);

                const map = new Map<string, ClientLabel>();

                for (const label of recipe.labels) {
                    map.set(uuid.v4(), {
                        _id: label._id,
                        tag: label.tag,
                        color: label.color,
                        tool: label.tool,
                        isDeleted: false,
                        isNew: false,
                        isModified: false,
                        name: label.name,
                    });
                }

                setLabels({
                    labels: map,
                });
            }
        }

        load().then();
    }, [props.id]);

    function addLabel() {
        const newLabels = labels;

        newLabels.set(uuid.v4(), {
            _id: undefined,
            tool: 'boundingBox',
            color: '#fff',
            isDeleted: false,
            isModified: false,
            isNew: true,
            name: '',
        });

        setLabels({
            labels: newLabels,
        });
    }

    function removeLabel(clientSideUuid: string) {
        const label = labels.get(clientSideUuid);

        if (label) {
            // Label is not saved - there's no need to persist.
            if (label.isNew) labels.delete(clientSideUuid);
            // Label will be deleted - there is a need to persist.
            else label.isDeleted = true;

            // Refresh.
            setLabels({
                labels,
            });
        }
    }

    async function onSubmit() {
        if (!props.id)
            await createRecipe({
                name: name,
                labels: Array.from(labels.values()),
            });
        else
            await editRecipe(props.id, {
                name: name,
                labels: Array.from(labels.values()),
            });

        closeForm();
    }

    return (
        <form className={ classes.recipeForm }>
            <fieldset>
                <label>
                    <TextInput
                        placeholder="Recipe name"
                        icon={ link.src }
                        label="Name"
                        onChange={ (e) => setName(e.currentTarget.value) }
                        value={ name }
                    />
                </label>
            </fieldset>

            <fieldset className={ classes.labelFieldsetOuter }>
                <div className={ classes.labelFieldset }>
                    <legend className={ classes.recipeLabelHeader }>
                        <div className={ classes.recipeLabelDesc }>
                            <ReactSVG src={ pen.src } />
                            <span>Labels</span>
                        </div>

                        { !immutable && (
                            <button
                                onClick={ addLabel }
                                className={ classes.addLabelButton }
                                type="button"
                            >
                                <ReactSVG src={ add.src } />
                            </button>
                        ) }
                    </legend>

                    { labels.size > 0 ? (
                        <ul className={ classes.labelDataFieldWrapper }>
                            { Array.from(labels.entries()).map(
                                function transformEntry([
                                    clientSideUuid,
                                    label,
                                ]) {
                                    return (
                                        <Label
                                            { ...label }
                                            immutable={ immutable }
                                            key={ clientSideUuid }
                                            onDelete={ () => {
                                                removeLabel(clientSideUuid);
                                            } }
                                            onModify={ (modifyParams) => {
                                                const label =
                                                    labels.get(clientSideUuid);

                                                if (label) {
                                                    if (modifyParams.tool)
                                                        label.tool =
                                                            modifyParams.tool;
                                                    if (modifyParams.name)
                                                        label.name =
                                                            modifyParams.name;
                                                    if (modifyParams.color)
                                                        label.color =
                                                            modifyParams.color;

                                                    label.isModified = true;
                                                }
                                            } }
                                        />
                                    );
                                }
                            ) }
                        </ul>
                    ) : (
                        <></>
                    ) }
                </div>
            </fieldset>

            <div className={ classes.saveButtonWrapper }>
                <button
                    type="button"
                    onClick={ onSubmit }
                    className={ classes.saveButton }
                >
                    Save Recipe
                </button>
            </div>
        </form>
    );
}

function Label(
    props: ClientLabel & {
        onDelete: () => void;
        onModify: (modifyParams: {
            name?: string;
            color?: string;
            tool?: Flockfysh.AnnotationTool;
        }) => void;
        immutable: boolean;
    }
) {
    if (props.isDeleted) return <></>;

    const unEditable = props.immutable && !props.isNew;

    return (
        <li className={ classes.labelDataField }>
            <input
                type="color"
                disabled={ unEditable }
                className={ classes.labelColorInput }
                defaultValue={ props.color }
                onChange={ (e) => {
                    props.onModify({
                        color: e.currentTarget.value,
                    });
                } }
            />

            <TextInput
                placeholder="Label name"
                disabled={ unEditable }
                defaultValue={ props.name }
                classNames={ {
                    input: classes.labelInput,
                    container: classes.labelContainer,
                } }
                onChange={ (e) => {
                    if (!unEditable) {
                        props.onModify({
                            name: e.currentTarget.value,
                        });
                    }
                } }
            />

            <Select
                isDisabled={ unEditable }
                defaultValue={ ANNOTATION_TOOL_FULL_OPTIONS.find(
                    (opt) => opt.value === props.tool
                ) }
                options={ ANNOTATION_TOOL_FULL_OPTIONS }
                className={ classes.labelToolSelectContainer }
                classNames={ {
                    control: () => {
                        return classes.labelToolSelectControl;
                    },
                    menu: () => {
                        return classes.labelToolSelectMenu;
                    },
                    menuList: () => {
                        return classes.labelToolSelectMenuList;
                    },
                    singleValue: () => {
                        return classes.labelToolSelectSingleValue;
                    },
                } }
                onChange={ (newValue: any) => {
                    if (!unEditable)
                        props.onModify({
                            tool: newValue.value as Flockfysh.AnnotationTool,
                        });
                } }
            />

            <button
                onClick={ () => (!unEditable ? props.onDelete() : null) }
                className={ `${classes.deleteLabelButton} ${
                    unEditable ? classes.deleteLabelButtonDisabled : ''
                }` }
                type="button"
            >
                <ReactSVG src={ unEditable ? lock.src : trash.src } />
            </button>
        </li>
    );
}
