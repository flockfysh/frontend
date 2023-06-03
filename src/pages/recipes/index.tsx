import { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactSVG } from 'react-svg';

import { v4 } from 'uuid';
import dayjs from 'dayjs';

import MainLayout from '@/components/layout/MainLayout';
import RecipeCard from '@/components/specific/datasets/recipes/RecipeCard';

import search from '@/icons/main/search.svg';
import sliders from '@/icons/main/sliders.svg';
import sun from '@/icons/main/sun.svg';
import plusCircle from '@/icons/main/plus-circle.svg';

import classes from './styles.module.css';
import CreateRecipeModal from '@/components/createRecipeModal';


const TEST_RECIPES = Array.from({ length: 25 }, () => {
    return {
        name: 'Recipe Name',
        createdAt: dayjs().subtract(15, 'minute').toDate(),
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        id: v4(),
        usedDatasets: 5,
        type: 'Image Data',

    };
});


const MyDatasets: NextPageWithLayout = function () {
    const [createRecipe, updateCreateRecipe] = useState(false);

    return (
        <>
            { createRecipe && <CreateRecipeModal onClose={ () => updateCreateRecipe(false) } /> }
            
            <header className={ classes.header }>
                <div className={ classes.headerTitleAndCTA }>
                    <h1 className={ classes.headerTitle }>Your Recipies</h1>
                    <div className={ classes.headerCTA }>
                        <div className={ classes.lightIcon }>
                            <ReactSVG src={ sun.src }></ReactSVG>
                        </div>

                        <button className={ classes.newRecipeButton } onClick={ () => updateCreateRecipe(true) }>
                          Create Recipe
                          <ReactSVG src={ plusCircle.src }></ReactSVG>
                        </button>
                    </div>
                </div>
                <label className={ classes.searchBarContainer }>
                  <ReactSVG src={ search.src } className={ classes.searchBarIcon }></ReactSVG>
                  <input type={ 'search' } className={ classes.searchBarInput } placeholder={ 'Search' }/>
                  <button className={ classes.searchFilterButton }>
                    <ReactSVG src={ sliders.src } className={ classes.searchFilterIcon }></ReactSVG>
                  </button>
                </label>

            </header>

            <div className={ classes.mainContent }>
                <ul className={ classes.datasetGrid }>
                    { TEST_RECIPES.map(recipe => <RecipeCard key={ recipe.id } { ...recipe } />) }
                </ul>
            </div>
        </>
    );
};

MyDatasets.getLayout = function (page) {
    return (
        <MainLayout>
            { page }
        </MainLayout>
    );
};

export default MyDatasets;
