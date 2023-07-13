import { useContext } from 'react';
import { NextPageWithLayout } from '@/pages/_app';

import ItemViewer from '@/components/specific/marketplace/itemViewer';
import MarketplaceLayout from '@/components/layout/marketplaceLayout';
import DatasetInfo, {
    DatasetInfoContext,
} from '@/components/layout/datasetLayout';

function DatasetItems() {
    const dataset = useContext(DatasetInfoContext);
    
    if (dataset) return <ItemViewer { ...dataset } />;
    else return <></>;
}

(DatasetItems as NextPageWithLayout).getLayout = function (page) {
    return (
        <MarketplaceLayout>
            <DatasetInfo>{ page }</DatasetInfo>
        </MarketplaceLayout>
    );
};

export default DatasetItems;
