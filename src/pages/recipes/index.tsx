import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactSVG } from 'react-svg';

import { v4 } from 'uuid';
import dayjs from 'dayjs';

import MainLayout from '@/components/layout/MainLayout';
import RecipeCard from '@/components/specific/recipes/RecipeCard';

import search from '@/icons/main/search.svg';
import sliders from '@/icons/main/sliders.svg';

import classes from './styles.module.css';

import DarkModeButton from '@/components/ui/theming/DarkModeButton';
import CreateRecipeModal from '@/components/specific/recipes/CreateRecipeModal';


const TEST_RECIPES = Array.from({ length: 25 }, () => {
    return {
        name: 'Recipe Name',
        createdAt: dayjs().subtract(15, 'minute').toDate(),
        labels: new Map([
            ['clientSideUuid', {
                _id: undefined,
                tool: 'boundingBox',
                color: '#fff',
                isDeleted: false,
                isNew: true,
                name: 'Dog'
            }],
            ['clientSideUuid1', {
                _id: undefined,
                tool: 'boundingBox',
                color: '#fff',
                isDeleted: false,
                isNew: true,
                name: 'Eagle'
            }],
            ['clientSideUuid2', {
                _id: undefined,
                tool: 'boundingBox',
                color: '#fff',
                isDeleted: false,
                isNew: true,
                name: 'Dolphin'
            }],
            ['clientSideUuid3', {
                _id: undefined,
                tool: 'boundingBox',
                color: '#fff',
                isDeleted: false,
                isNew: true,
                name: 'Cat'
            }]
        ]),
        id: v4(),
        usedDatasets: 5,
        type: 'Image Data',
    };
});

const RecipePage: NextPageWithLayout = function () {
    return (
        <>
            <header className={ classes.header }>
                <div className={ classes.headerTitleAndCTA }>
                    <h1 className={ classes.headerTitle }>Your Recipies</h1>
                    <div className={ classes.headerCTA }>
                        <DarkModeButton></DarkModeButton>

                        <CreateRecipeModal />
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

RecipePage.getLayout = function (page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    );
};

export default RecipePage;
