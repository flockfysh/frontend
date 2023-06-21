import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactSVG } from 'react-svg';

import MainLayout from '@/components/layout/mainLayout';
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
            next: undefined,
            recipes: [],
        };
    };
    const [state, setState] = React.useState<{
        hasMore: boolean,
        next: string | undefined,
        recipes: Flockfysh.RecipeWithLabels[],
    }>(initialState);

    async function load() {
        const fetched = (await api.get<Api.PaginatedResponse<Flockfysh.RecipeWithLabels[]>>('/api/recipes/search', {
            params: {
                name: props.name,
                next: state.next,
                expand: 'labels',
                limit: 50,
            }
        })).data;
        state.recipes.push(...fetched.data);
        setState({
            hasMore: fetched.meta.hasNext,
            recipes: state.recipes,
            next: fetched.meta.next,
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
