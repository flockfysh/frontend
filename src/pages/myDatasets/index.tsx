import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/components/layout/MainLayout';

import CreateDatasetModal from '@/components/createDatasetModal';

const MyDatasets: NextPageWithLayout = function () {
    return <h1>Oof</h1>;
};

MyDatasets.getLayout = function (page) {
    return (
        <MainLayout>
            { page }
            <CreateDatasetModal></CreateDatasetModal>
        </MainLayout>
    );
};

export default MyDatasets;
