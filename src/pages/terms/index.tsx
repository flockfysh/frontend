import { NextPageWithLayout } from '@/pages/_app';

import MainLayout from '@/components/layout/mainLayout';
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
