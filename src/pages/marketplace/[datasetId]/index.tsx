import { NextPageWithLayout } from '@/pages/_app';
import ItemViewer from '@/components/specific/marketplace/itemViewer';
import MarketplaceLayout from '@/components/layout/marketplaceLayout';
import DatasetInfo, { DatasetInfoContext } from '@/components/layout/datasetLayout';
import { useContext } from 'react';

const DatasetItems: NextPageWithLayout = function () {
    const dataset = useContext(DatasetInfoContext);
    if (dataset) {
        return <ItemViewer { ...dataset }></ItemViewer>;
    }
    else {
        return <></>;
    }
};

DatasetItems.getLayout = function (page) {
    return (
        <MarketplaceLayout>
            <DatasetInfo>
                { page }
            </DatasetInfo>
        </MarketplaceLayout>
    );
};

export default DatasetItems;
