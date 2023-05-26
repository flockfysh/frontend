import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/components/layout/MainLayout';
import classes from './styles.module.css';
import { ReactSVG } from 'react-svg';
import search from '@/icons/main/search.svg';
import sliders from '@/icons/main/sliders.svg';

const MyDatasets: NextPageWithLayout = function () {
    return (
        <header className={ classes.header }>
            <label className={ classes.searchBarContainer }>
                <ReactSVG src={ search.src } className={ classes.searchBarIcon }></ReactSVG>
                <input type={ 'search' } className={ classes.searchBarInput } placeholder={ 'Search' }/>
                <button className={ classes.searchFilterButton }>
                    <ReactSVG src={ sliders.src } className={ classes.searchFilterIcon }></ReactSVG>
                </button>
            </label>
        </header>
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
