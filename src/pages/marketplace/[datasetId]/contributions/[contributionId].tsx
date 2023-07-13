import { useContext } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';

import ContributionDetails from '@/components/specific/marketplace/contributionDetails';

import DatasetInfo, {
    DatasetInfoContext,
} from '@/components/layout/datasetLayout';

import MarketplaceLayout from '@/components/layout/marketplaceLayout';

function ContributionDetailedPage() {
    const dataset = useContext(DatasetInfoContext);
    const router = useRouter();
    
    const contributionId = router.query.contributionId;
    if (!dataset || typeof contributionId !== 'string') return <></>;
    
    return (
        <ContributionDetails
            dataset={ dataset }
            contributionId={ contributionId }
        />
    );
}

(ContributionDetailedPage as NextPageWithLayout).getLayout = function (page) {
    return (
        <MarketplaceLayout>
            <DatasetInfo>{ page }</DatasetInfo>
        </MarketplaceLayout>
    );
};

export default ContributionDetailedPage;
