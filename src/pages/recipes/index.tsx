import { useRef, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { ReactSVG } from 'react-svg';

import { NextPageWithLayout } from '@/pages/_app';

import MainLayout from '@/components/layout/mainLayout';
import RecipeCard from '@/components/specific/recipes/recipeCard';
import DarkModeButton from '@/components/ui/theming/darkModeButton';
import CreateRecipeModal from '@/components/specific/recipes/createRecipeModal';

import api from '@/helpers/api';

import search from '@/icons/main/search.svg';
import sliders from '@/icons/main/sliders.svg';

import classes from './styles.module.css';

function RecipeSearchResult(props: { name?: string }) {
    const scrollerContainerRef = useRef<HTMLDivElement | null>(null);
    const initialState = () => {
        return {
            hasMore: true,
            next: undefined,
            recipes: [],
        };
    };

    const [state, setState] = useState<{
        hasMore: boolean;
        next: string | undefined;
        recipes: Flockfysh.RecipeWithLabels[];
    }>(initialState);

    async function load() {
        const fetched = (
            await api.get<Api.PaginatedResponse<Flockfysh.RecipeWithLabels[]>>(
                '/api/recipes/search',
                {
                    params: {
                        name: props.name,
                        next: state.next,
                        expand: 'labels',
                        limit: 50,
                    },
                }
            )
        ).data;

        state.recipes.push(...fetched.data);

        setState({
            hasMore: fetched.meta.hasNext,
            recipes: state.recipes,
            next: fetched.meta.next,
        });
    }

    useEffect(() => {
        setState(initialState);
    }, [props.name]);

    return (
        <div className={ classes.mainContent } ref={ scrollerContainerRef }>
            <InfiniteScroll
                useWindow={ false }
                loadMore={ load }
                hasMore={ state.hasMore }
                getScrollParent={ () => {
                    return scrollerContainerRef.current;
                } }
            >
                <ul className={ classes.datasetGrid }>
                    { state.recipes.map((recipe) => (
                        <RecipeCard key={ recipe._id } { ...recipe } />
                    )) }
                </ul>
            </InfiniteScroll>
        </div>
    );
}

const RecipePage: NextPageWithLayout = function () {
    const [curSearchQuery, setCurSearchQuery] = useState<string>('');

    return (
        <>
            <header className={ classes.header }>
                <div className={ classes.headerTitleAndCTA }>
                    <h1 className={ classes.headerTitle }>Your Recipes</h1>

                    <div className={ classes.headerCTA }>
                        <DarkModeButton />
                        <CreateRecipeModal />
                    </div>
                </div>

                <label className={ classes.searchBarContainer }>
                    <ReactSVG
                        src={ search.src }
                        className={ classes.searchBarIcon }
                    />

                    <input
                        type="search"
                        className={ classes.searchBarInput }
                        value={ curSearchQuery }
                        onChange={ (e) => {
                            setCurSearchQuery(e.currentTarget.value);
                        } }
                        placeholder="Search"
                    />

                    <button className={ classes.searchFilterButton }>
                        <ReactSVG
                            src={ sliders.src }
                            className={ classes.searchFilterIcon }
                        />
                    </button>
                </label>
            </header>

            <RecipeSearchResult name={ curSearchQuery || undefined } />
        </>
    );
};

RecipePage.getLayout = function (page) {
    return <MainLayout>{ page }</MainLayout>;
};

export default RecipePage;
