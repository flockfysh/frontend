import { useContext, useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';

import { v4 } from 'uuid';
import { ManipulateType } from 'dayjs';
import { fakerEN } from '@faker-js/faker';

import HowToCards from '@/components/specific/marketplace/datasetCards/howToCards';
import FeaturedDatasetsSection from '@/components/specific/marketplace/featuredDatasetsSection';
import DatasetSwiper from '@/components/specific/marketplace/datasetSwiper';
import CollectionSwiper from '@/components/specific/marketplace/collectionSwiper';
import DatasetTimeFilter from '@/components/specific/marketplace/datasetTimeFilter';
import MarketplaceLayout from '@/components/layout/marketplaceLayout';
import PostSwiper from '@/components/specific/marketplace/postSwiper';

import { PostContext } from '@/contexts/postContext';

import api from '@/helpers/api';
import { dayjs } from '@/helpers/date';

import 'swiper/css';
import 'swiper/css/navigation';

import classes from './styles.module.css';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

function Collections() {

    const router = useRouter();

    const tag = router.query.tag;

    const [datasets, setDatasets] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const res = (await api.get(`/api/datasets/top/${tag}`)).data.data;

            setDatasets(res);
        }

        fetchData();
    }, []);


    return (
        <>
            <NextSeo
                title={ `flockfysh | Top datasets for ${tag}` }
                description={ `These are the most popular datasets found for this specific
                tag. There are ${datasets.length} datasets for this, ranging from text problems like question answer, LLM evaluation, to computer vision problems
                such as object detection, segmentations, and keypoint trackings. Buy or build your next dataset of your dreams here today!` }
            />

            <div className={ classes.container }>
                <h1 className= { classes.header }> Showing results for { tag } </h1>

                { datasets && !!datasets.length && (
                    <FeaturedDatasetsSection datasets={ datasets } />
                ) }

            </div>

        </>
    );
}

(Collections as NextPageWithLayout).getLayout = function (page) {
    return <MarketplaceLayout>{ page }</MarketplaceLayout>;
};

export default Collections;
