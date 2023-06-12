import ActionPopupWithButton from '@/components/ui/modals/ActionPopupWithButton';
import React, { ButtonHTMLAttributes } from 'react';
import add from '@/icons/main/plus-circle.svg';
import { ReactSVG } from 'react-svg';
import classes from './styles.module.css';
import RecipeForm from '@/components/specific/recipes/RecipeForm';


const CreateRecipeButton = (buttonsProps: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button className={ classes.newRecipeButton } { ...buttonsProps }>
            Create Recipe
            <ReactSVG src={ add.src }></ReactSVG>
        </button>
    );
};

export default function CreateRecipeModal() {
    return (
        <ActionPopupWithButton modalClassName={ classes.recipeModal } button={ <CreateRecipeButton/> }
                               popupTitle={ 'Create recipe' }>
            <RecipeForm></RecipeForm>
        </ActionPopupWithButton>
    );
}

