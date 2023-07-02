import { NextPageWithLayout } from '@/pages/_app';
import ContributionDetails from '@/components/specific/marketplace/contributionDetails';
import React from 'react';
import DatasetInfo, { DatasetInfoContext } from '@/components/layout/datasetLayout';
import MarketplaceLayout from '@/components/layout/marketplaceLayout';
import { useRouter } from 'next/router';

const ContributionDetailedPage: NextPageWithLayout = function () {
    const dataset = React.useContext(DatasetInfoContext);
    const router = useRouter();
    const contributionId = router.query.contributionId;
    if (!dataset || typeof contributionId !== 'string') {
        return <></>;
    }
    return <ContributionDetails dataset={ dataset } contributionId={ contributionId }></ContributionDetails>;
};

ContributionDetailedPage.getLayout = function (page) {
    return (
        <MarketplaceLayout>
            <DatasetInfo>{ page }</DatasetInfo>
        </MarketplaceLayout>
    );
};

export default ContributionDetailedPage;
