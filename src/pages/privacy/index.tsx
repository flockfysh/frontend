import { NextPageWithLayout } from '@/pages/_app';

import MainLayout from '@/components/layout/mainLayout';
import Footer from '@/components/specific/marketplace/footer';

const PrivacyPage: NextPageWithLayout = function () {
    return (
        <>
            <h1>Privacy</h1>

            <Footer />
        </>
    );
};

PrivacyPage.getLayout = function (page) {
    return <MainLayout>{ page }</MainLayout>;
};

export default PrivacyPage;
