import { useContext } from 'react';
import { NextPageWithLayout } from '@/pages/_app';

import MarketplaceLayout from '@/components/layout/marketplaceLayout';
import DatasetInfo, {
    DatasetInfoContext,
} from '@/components/layout/datasetLayout';
import DatasetSettingsLayout from '@/components/specific/marketplace/datasetSettings';

const DatasetActivityPage: NextPageWithLayout = function () {
    const dataset = useContext(DatasetInfoContext);
    if (dataset)
        return <DatasetSettingsLayout { ...dataset } />;
    else return <></>;
};

DatasetActivityPage.getLayout = function (page) {
    return (
        <MarketplaceLayout>
            <DatasetInfo>{ page }</DatasetInfo>
        </MarketplaceLayout>
    );
};

export default DatasetActivityPage;
