
import { NextPageWithLayout } from '@/pages/_app';

import MainLayout from '@/components/layout/mainLayout';
import DarkModeButton from '@/components/ui/theming/darkModeButton';

import api from '@/helpers/api';

import search from '@/icons/main/search.svg';
import sliders from '@/icons/main/sliders.svg';

import classes from './styles.module.css';
import Footer from '@/components/specific/marketplace/footer';

const TermsPage: NextPageWithLayout = function () {

    return (
        <>
            <h1>
                Terms of Service
            </h1>
            <Footer />
        </>
    );
};

TermsPage.getLayout = function (page) {
    return <MainLayout>{ page }</MainLayout>;
};

export default TermsPage;