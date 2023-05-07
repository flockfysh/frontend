import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/components/layout/MainLayout';

const MyDatasets: NextPageWithLayout = function () {
    return <h1>Oof</h1>;
};

MyDatasets.getLayout = function (page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    );
};

export default MyDatasets;
