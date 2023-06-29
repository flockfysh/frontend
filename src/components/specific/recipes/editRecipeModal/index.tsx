import { ReactSVG } from 'react-svg';

import ActionPopupWithButton from '@/components/ui/modals/actionPopupWithButton';
import RecipeForm from '@/components/specific/recipes/recipeForm';

import edit from '@/icons/main/edit-3.svg';

import classes from './styles.module.css';

export default function EditRecipeModal(props: {
    id: string,
}) {
    return (
        <ActionPopupWithButton
            modalClassName={ classes.recipeModal }
            button={ (
                <button className={ classes.actionEdit }>
                    <ReactSVG src={ edit.src } />
                </button>
            ) }
            popupTitle="Edit recipe"
        >
            <RecipeForm id={ props.id } />
        </ActionPopupWithButton>
    );
}
