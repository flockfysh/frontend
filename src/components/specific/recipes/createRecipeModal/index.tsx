import { ButtonHTMLAttributes } from 'react';
import { ReactSVG } from 'react-svg';

import ActionPopupWithButton from '@/components/ui/modals/actionPopupWithButton';
import RecipeForm from '@/components/specific/recipes/recipeForm';

import add from '@/icons/main/plus-circle.svg';

import classes from './styles.module.css';

function CreateRecipeButton(buttonsProps: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={ classes.newRecipeButton }
            { ...buttonsProps }
        >
            Create Recipe
            <ReactSVG src={ add.src } />
        </button>
    );
}

export default function CreateRecipeModal() {
    return (
        <ActionPopupWithButton
            modalClassName={ classes.recipeModal }
            button={ <CreateRecipeButton /> }
            popupTitle="Create recipe"
        >
            <RecipeForm />
        </ActionPopupWithButton>
    );
}
