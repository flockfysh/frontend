import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactSVG } from 'react-svg';

import MainLayout from '@/components/layout/MainLayout';
import RecipeCard from '@/components/specific/recipes/RecipeCard';

import search from '@/icons/main/search.svg';
import sliders from '@/icons/main/sliders.svg';
import InfiniteScroll from 'react-infinite-scroller';

import DarkModeButton from '@/components/ui/theming/DarkModeButton';
import CreateRecipeModal from '@/components/specific/recipes/CreateRecipeModal';
import classes from './styles.module.css';
import api from '@/helpers/api';

function RecipeSearchResult(props: {
    name?: string
}) {
    const scrollerContainerRef = React.useRef<HTMLDivElement | null>(null);
    const initialState = () => {
        return {
            hasMore: true,
            prevId: undefined,
            recipes: [],
        };
    };
    const [state, setState] = React.useState<{
        hasMore: boolean,
        prevId: string | undefined,
        recipes: Flockfysh.RecipeWithLabels[],
    }>(initialState);

    async function load() {
        const fetched = (await api.get<{
            success: true,
            data: Flockfysh.RecipeWithLabels[]
        }>('/api/recipes/search', {
            params: {
                name: props.name,
                lessThan: state.prevId,
                expand: 'labels',
                limit: 50,
            }
        })).data.data;
        state.recipes.push(...fetched);
        setState({
            hasMore: fetched.length > 0,
            recipes: state.recipes,
            prevId: fetched[fetched.length - 1]?._id,
        });
    }

    React.useEffect(() => {
        setState(initialState);
    }, [props.name]);

    return (
        <div className={ classes.mainContent } ref={ scrollerContainerRef }>
            <InfiniteScroll useWindow={ false } loadMore={ load } hasMore={ state.hasMore } getScrollParent={ () => {
                return scrollerContainerRef.current;
            } }>
                <ul className={ classes.datasetGrid }>
                    {state.recipes.map(recipe => <RecipeCard key={ recipe._id } { ...recipe } />)}
                </ul>
            </InfiniteScroll>
        </div>
    );
}

const RecipePage: NextPageWithLayout = function () {
    const [curSearchQuery, setCurSearchQuery] = React.useState<string>('');

    return (
        <>
            <header className={ classes.header }>
                <div className={ classes.headerTitleAndCTA }>
                    <h1 className={ classes.headerTitle }>Your Recipes</h1>
                    <div className={ classes.headerCTA }>
                        <DarkModeButton></DarkModeButton>
                        <CreateRecipeModal/>
                    </div>
                </div>
                <label className={ classes.searchBarContainer }>
                    <ReactSVG src={ search.src } className={ classes.searchBarIcon }></ReactSVG>
                    <input type={ 'search' } className={ classes.searchBarInput } value={ curSearchQuery } onChange={ (e) => {
                        setCurSearchQuery(e.currentTarget.value);
                    } } placeholder={ 'Search' }/>
                    <button className={ classes.searchFilterButton }>
                        <ReactSVG src={ sliders.src } className={ classes.searchFilterIcon }></ReactSVG>
                    </button>
                </label>

            </header>
            <RecipeSearchResult name={ curSearchQuery || undefined }></RecipeSearchResult>
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
