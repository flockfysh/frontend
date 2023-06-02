import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { NextPageWithLayout } from '@/pages/_app';
import DarkModeButton from '@/components/ui/theming/DarkModeButton';
import ActionPopupWithButton from '@/components/ui/modals/ActionPopupWithButton';
import CreateRecipeModal from '@/components/specific/recipes/CreateRecipeModal';

const RecipePage: NextPageWithLayout = function () {
    return (
        <>
            <header>
                <h1>Your Recipes</h1>
                <div>
                    <DarkModeButton></DarkModeButton>
                    <CreateRecipeModal></CreateRecipeModal>
                </div>
            </header>
        </>
    );
};

RecipePage.getLayout = function (page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    );
};

export default RecipePage;
