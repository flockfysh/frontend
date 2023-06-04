import classes from './styles.module.css';
import { ReactSVG } from 'react-svg';
import edit from '@/icons/main/edit-3.svg';
import ActionPopupWithButton from '@/components/ui/modals/ActionPopupWithButton';
import RecipeForm from '@/components/specific/recipes/RecipeForm';

export default function EditRecipeModal(props: {
    id: string,
}) {
    return (
        <ActionPopupWithButton modalClassName={ classes.recipeModal } button={ (
            <button className={ classes.actionEdit }>
                <ReactSVG src={ edit.src }></ReactSVG>
            </button>
        ) } popupTitle={ 'Edit recipe' }>
            <RecipeForm id={ props.id }></RecipeForm>
        </ActionPopupWithButton>
    );
}
