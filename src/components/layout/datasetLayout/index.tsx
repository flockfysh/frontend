import { useRouter } from 'next/router';
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';

import Contribute from '@/components/specific/marketplace/contributeAlert';
import RadioButtons from '@/components/ui/input/radioButtons';
import ActionPopupWithButton from '@/components/ui/modals/actionPopupWithButton';

import { DownloaderContext } from '@/contexts/downloaderContext';
import Avatar from 'boring-avatars';
import api from '@/helpers/api';
import { dayjs } from '@/helpers/date';
import { formatFileSize } from '@/helpers/formatting';
import { genPurchaseUrl } from '@/helpers/endpoints/datasets';
import { DATASET_LICENSE_DESCRIPTION } from '@/helpers/enums/license';
import { RandomGradientComponent } from '@/helpers/gradients';
import bookmark from '@/icons/main/bookmark.svg';
import bookmarkFilled from '@/icons/main/bookmarkFilled.svg';
import cpu from '@/icons/main/cpu.svg';
import download from '@/icons/main/download.svg';
import flag from '@/icons/main/flag.svg';


import classes from './styles.module.css';
import { NextSeo } from 'next-seo';

export const DatasetInfoContext = createContext<PreviewDataset | undefined>(
    undefined
);

export default function DatasetInfo(props: PropsWithChildren) {
    const router = useRouter();
    const [dataset, setDataset] = useState<PreviewDataset | undefined>();
    const [liked, setLike] = useState(false);
    const [bookmarked, setBookmark] = useState(false);
    const [likeCounts, setLikeCounts] = useState(0);
    const { downloadDataset } = useContext(DownloaderContext);
    const datasetId = router.query.datasetId;

 
    async function goToCheckout() {
        const clientSecret = (await api.post(`/api/payments/purchaseDataset`, {
            datasetId: datasetId
        })).data.data;   
        
        router.push(clientSecret);
    }


    useEffect(() => {
        async function load() {
            if (typeof datasetId !== 'string') return;

            const result = (
                await api.get<Api.Response<PreviewDataset>>(
                    `/api/datasets/${datasetId}`,
                    {
                        params: {
                            expand: 'size,assetCounts,annotationCounts,user,contributors,thumbnail,icon,permission',
                        },
                    }
                )
            ).data.data;

                    
            setDataset(result);

            await api.post(`/api/datasets/${datasetId}/metrics`, {
                type: 'view',
            });
        }

        load().then();
    }, [datasetId]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/datasets/${datasetId}/likes/count`);
            setLikeCounts(res.data.data);
        };

        fetchData();
    }, [datasetId]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/datasets/${datasetId}/likes`);
            setLike(res.data.data);
        };

        fetchData();
    }, [datasetId]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/datasets/${datasetId}/bookmarks`);
            setBookmark(res.data.data);
        };

        fetchData();
    }, [datasetId]);


    let cashRem:any = dataset?.payments.paymentParameters;
    let cashPerTot:any = -1;
    if(dataset?.payments.schemeType === 'build'){
        cashPerTot = (0.75 * dataset?.payments.totalPayment) / ( dataset.desiredDatasetSize ?? 1);
        cashRem = cashRem.cashRemaining;
    }

    if (!dataset || typeof datasetId !== 'string') return <></>;


    const cols = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus'];
    return (
        <DatasetInfoContext.Provider value={ dataset }>
            
            <NextSeo
                title={ `flockfysh | Viewing dataset ${dataset.name}` }
                description={ `You are viewing the dataset called ${dataset.name}, which is for ${dataset.description}. This dataset really relevant to ${dataset.tags}, as well as ${dataset.subTags}. The dataset has type ${dataset.type}, and is public: ${dataset.public}. The flockfysh data exchange serves as the main platform to connect with other passionate AI lovers and buy and build large scale AI datasets and models. There are 1000 datasets for this, ranging from text problems like question answer, LLM evaluation, to computer vision problems
                such as object detection, segmentations, and keypoint trackings. Buy or build your next dataset of your dreams here today!` }
            />


            <div className={ classes.container }>
                <header className={ classes.headerWrapper }>
                    { /* image */ }
                    <div className={ classes.imageWrapper }>
                        {
                            dataset.thumbnail?.url ? 
                                (
                                <img
                                className={ classes.headerImage }
                                src={
                                    dataset.thumbnail?.url
                                }
                                alt="Datasets portrait image"
                            />
) :
                             (
                                <RandomGradientComponent className = { classes.headerImage } />
                             )
                        }

                        <div className={ classes.imageTag }>
                            <ReactSVG
                                className={ classes.imageTagIcon }
                                src={ cpu.src }
                            />

                            <div className={ classes.imageTagSeparator } />

                            <span className={ classes.imageTagText }>
                                { dataset.type.toUpperCase() }
                            </span>
                        </div>
                    </div>

                    { /* basic info */ }
                    <div className={ classes.dataContainer }>
                        { /* first row */ }
                        <div className={ classes.actionButtonsAndImageWrapper }>
                            <div className={ classes.datasetImageWrapper }>
                                <div className={ classes.datasetImageContainer }>
                                    { 
                                        dataset.icon?.url ? 
                                        (
                                        <img
                                            className={ classes.datasetImage }
                                            src={
                                                dataset.icon?.url 
                                            }
                                            alt="Datasets Image"
                                        />
                                        ): (
                                        <div className= { classes.datasetImage }>
                                            <Avatar
                                                name= { dataset.name }
                                                size= { 150 }
                                                square = { true }
                                                variant = { cols[dataset.name.length % cols.length] } 
                                            />
                                        </div>
                                        )
                                    }
                                </div>
                            </div>

                            <div className={ classes.dataActionButtons }>
                                <div className={ classes.basicActionsWrapper }>
                                    <button className={ classes.basicButton }>
                                        <ReactSVG
                                            className={ classes.imageTagIcon }
                                            src={ flag.src }
                                        />
                                    </button>

                                    <button
                                        className={ classes.basicButton }
                                        onClick={ async () => {
                                            setBookmark(!bookmarked);
                                            if (!bookmarked) {
                                                await api.post(
                                                    `/api/datasets/${datasetId}/bookmarks`
                                                );
                                                setBookmark(true);
                                            }
 else {
                                                await api.delete(
                                                    `/api/datasets/${datasetId}/bookmarks`
                                                );
                                                setBookmark(false);
                                            }
                                        } }
                                    >
                                        <ReactSVG
                                            className={ classes.imageTagIcon }
                                            src={
                                                bookmarked
                                                    ? bookmarkFilled.src
                                                    : bookmark.src
                                            }
                                        />
                                    </button>
                                </div>

                                { dataset.permission !== 'preview'  ? (
                                    <>
                                        <ActionPopupWithButton
                                            button={ (
                                                <button
                                                    className={
                                                        classes.contributeButton
                                                    }
                                                >
                                                    Contribute
                                                </button>
                                              ) }
                                            popupTitle={ 'Contribute' }
                                            variant={ 'marketplace' }
                                        >
                                            <Contribute dataset={ dataset } />
                                        </ActionPopupWithButton>

                                        <button
                                            className={ classes.downloadButton }
                                            onClick={ async () => {
                                                setLike(!liked);
                                                if (!liked) {
                                                    await api.post(
                                                        `/api/datasets/${datasetId}/likes`
                                                    );
                                                    const res = await api.get(
                                                        `/api/datasets/${datasetId}/likes/count`
                                                    );
                                                    setLikeCounts(
                                                        res.data.data
                                                    );
                                                    setLike(true);
                                                }

                                                else {
                                                    await api.delete(
                                                        `/api/datasets/${datasetId}/likes`
                                                    );
                                                    const res = await api.get(
                                                        `/api/datasets/${datasetId}/likes/count`
                                                    );
                                                    setLikeCounts(
                                                        res.data.data
                                                    );
                                                    setLike(false);
                                                }
                                            } }
                                        >
                                            <span>
                                                { liked ? 'Unlike' : 'Like' }
                                            </span>
                                            <span>{ likeCounts }</span>
                                        </button>

                                        <button
                                            className={ classes.downloadButton }
                                            onClick={ () =>
                                                downloadDataset(dataset._id)
                                            }
                                        >
                                            <ReactSVG
                                                className={ classes.imageTagIcon }
                                                src={ download.src }
                                            />

                                            <span>
                                                Download (
                                                { formatFileSize(
                                                    dataset.size.total.total
                                                ) }
                                                )
                                            </span>
                                        </button>
                                    </>
                                ): <></> }
                                {
                                    dataset.permission === 'preview' && dataset.payments.schemeType === 'upload' ? (
                                        <Link
                                            className={ classes.contributeButton }
                                            onClick={ () => goToCheckout() }
                                            href="#"
                                        >
                                            Buy full version for ${ dataset.payments.totalPayment.toFixed(2) }
                                        </Link>
                                    ) : <></>
                                } 
                                {
                                    dataset.permission === 'preview' && dataset.payments.schemeType === 'build' ? (
                                    <>
                                        <p> Total Payout: ${ (0.75 * dataset.payments.totalPayment).toFixed(2) } </p>
                                        <p> Cash Remaining: ${ (cashRem).toFixed(2) } </p>
                                        <p> Per item: ${ (cashPerTot).toFixed(2) } </p>
                                        <p> Looking for { dataset.desiredDatasetSize } samples </p>
                                        <ActionPopupWithButton
                                                button={ (
                                                    <button
                                                        className={
                                                            classes.contributeButton
                                                        }
                                                    >
                                                        Earn money through a contribution!
                                                    </button>
                                                ) }
                                                popupTitle={ 'Contribute' }
                                                variant={ 'marketplace' }
                                            >
                                                <Contribute dataset={ dataset } />
                                        </ActionPopupWithButton>

                                    </>
                                        
                                    ) : <></>
                                } 
                            </div>
                        </div>

                        { /* second row: description */ }
                        <div className={ classes.descriptionContainer }>
                            { /* title */ }
                            <div className={ classes.titleWrapper }>
                                <div className={ classes.titleContainer }>
                                    <h2 className={ classes.datasetTitle }>
                                        { dataset.name }
                                    </h2>

                                    <div className={ classes.tagsContainer }>
                                        { dataset.tags.map((tag) => {
                                            return (
                                                <span
                                                    className={
                                                        classes.datasetTag
                                                    }
                                                    key={ tag }
                                                >
                                                    { tag }
                                                </span>
                                            );
                                        }) }
                                    </div>
                                </div>

                                <Link
                                    className={ classes.datasetNick }
                                    href={ `/profile/${dataset.user.username}` }
                                >
                                    @{ dataset.user.username }
                                </Link>
                            </div>

                            { /* description */ }
                            <div className={ classes.descriptionWrapper }>
                                <p>{ dataset.description }</p>
                            </div>

                            { /* licence */ }
                            <div className={ classes.licenceWrapper }>
                                <ReactSVG
                                    className={ classes.imageTagIcon }
                                    src={ cpu.src }
                                />
                                { DATASET_LICENSE_DESCRIPTION[dataset.license] }
                            </div>
                        </div>
                    </div>

                    { /* action menu */ }
                    <div className={ classes.actionMenuContainer }>
                        { /* button group */ }
                        <RadioButtons
                            options={ [
                                {
                                    label: 'Items',
                                    value: `/marketplace/${dataset._id}`,
                                },
                                {
                                    label: 'Activity',
                                    value: `/marketplace/${dataset._id}/activity`,
                                
                                },
                                {
                                    label: 'Settings',
                                    value: `/marketplace/${dataset._id}/settings`,
                                    shown:
                                        dataset.permission === 'admin' ||
                                        dataset.permission === 'owner',
                                },
                                {
                                    label: 'Contributions',
                                    value: `/marketplace/${dataset._id}/contributions`,
                                    shown: (dataset.payments.totalPayment === 0) ||  
                                        (dataset.payments.totalPayment > 0 && (dataset.payments.schemeType === 'build' || dataset.permission === 'contributor' || 
                                        dataset.permission === 'admin' || dataset.permission === 'owner')),
                                },
                            ] }
                            isLink={ true }
                        />

                        { /* specification */ }
                        <div className={ classes.specificationWrapper }>
                            <div className={ classes.specificationContainer }>
                                <div className={ classes.specificationItem }>
                                    <span
                                        className={
                                            classes.specificationItemTitle
                                        }
                                    >
                                        { dataset.assetCounts.total }
                                    </span>

                                    <small>Files</small>
                                </div>

                                <div
                                    className={ classes.specificationSeparator }
                                />
                                <div className={ classes.specificationItem }>
                                    <span
                                        className={
                                            classes.specificationItemTitle
                                        }
                                    >
                                        { dataset.metrics.downloads }
                                    </span>

                                    <small>Downloads</small>
                                </div>

                                <div
                                    className={ classes.specificationSeparator }
                                />

                                <div className={ classes.specificationItem }>
                                    <span
                                        className={
                                            classes.specificationItemTitle
                                        }
                                    >
                                        { dayjs(dataset.createdAt).fromNow() }
                                    </span>

                                    <small>Created at</small>
                                </div>

                                <div
                                    className={ classes.specificationSeparator }
                                />

                                <div className={ classes.specificationItem }>
                                    <span
                                        className={
                                            classes.specificationItemTitle
                                        }
                                    >
                                        { dayjs(dataset.updatedAt).fromNow() }
                                    </span>

                                    <small>Last Updated</small>
                                </div>

                                <div
                                    className={ classes.specificationSeparator }
                                />

                                <div className={ classes.specificationItem }>
                                    <span
                                        className={
                                            classes.specificationItemTitle
                                        }
                                    >
                                        { dataset.contributors }
                                    </span>

                                    <small>Contributors</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                { props.children }
            </div>
        </DatasetInfoContext.Provider>
    );
}
