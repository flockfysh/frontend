import {
    useState,
    useContext,
    useEffect,
    PropsWithChildren,
    createContext
} from 'react';
import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/router';

import Contribute from '@/components/specific/marketplace/contributeAlert';
import ActionPopupWithButton from '@/components/ui/modals/actionPopupWithButton';
import RadioButtons from '@/components/ui/input/radioButtons';

import { DownloaderContext } from '@/contexts/downloaderContext';

import { formatFileSize } from '@/helpers/formatting';
import api from '@/helpers/api';
import { dayjs } from '@/helpers/date';

import cpu from '@/icons/main/cpu.svg';
import flag from '@/icons/main/flag.svg';
import download from '@/icons/main/download.svg';
import bookmark from '@/icons/main/bookmark.svg';

import classes from './styles.module.css';

export const DatasetInfoContext = createContext<
    PreviewDataset | undefined
>(undefined);

export default function DatasetInfo(props: PropsWithChildren) {
    const router = useRouter();

    const [dataset, setDataset] = useState<PreviewDataset | undefined>();
    const { downloadDataset } = useContext(DownloaderContext);

    useEffect(() => {
        async function load() {
            const datasetId = router.query.datasetId;

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
    }, [router.query.datasetId]);

    if (!dataset || typeof router.query.datasetId !== 'string') return <></>;

    return (
        <DatasetInfoContext.Provider value={dataset}>
            <div className={classes.container}>
                <header className={classes.headerWrapper}>
                    {/* image */}
                    <div className={classes.imageWrapper}>
                        <img
                            className={classes.headerImage}
                            src={
                                dataset.thumbnail?.url ??
                                'https://c.pxhere.com/photos/0d/b1/photo-168471.jpg!d'
                            }
                            alt="Datasets portrait image"
                        />

                        <div className={classes.imageTag}>
                            <ReactSVG
                                className={classes.imageTagIcon}
                                src={cpu.src}
                            />

                            <div className={classes.imageTagSeparator} />

                            <span className={classes.imageTagText}>
                                {dataset.type.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* basic info */}
                    <div className={classes.dataContainer}>
                        {/* first row */}
                        <div className={classes.actionButtonsAndImageWrapper}>
                            <div className={classes.datasetImageWrapper}>
                                <div className={classes.datasetImageContainer}>
                                    <img
                                        className={classes.datasetImage}
                                        src={
                                            dataset.icon?.url ??
                                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fcar-vehicle-martini-sports-car-race-car-supercar-team-racing-race-track-porsche-motorsport-leicam-summilux50f14-typ240-supercup-sebastianloeb-gt3r-louwmanmuseum-land-vehicle-auto-racing-automobile-make-automotive-design-performance-car-stock-car-racing-porsche-911-gt3-porsche-911-gt2-236174.jpg&f=1&nofb=1&ipt=1806d4f590c10c3f085ed81b7b35d359fb70e4d85672c00eb29e2eacf4b63453&ipo=images'
                                        }
                                        alt="Datasets Image"
                                    />
                                </div>
                            </div>

                            <div className={classes.dataActionButtons}>
                                <div className={classes.basicActionsWrapper}>
                                    <button className={classes.basicButton}>
                                        <ReactSVG
                                            className={classes.imageTagIcon}
                                            src={flag.src}
                                        />
                                    </button>

                                    <button className={classes.basicButton}>
                                        <ReactSVG
                                            className={classes.imageTagIcon}
                                            src={bookmark.src}
                                        />
                                    </button>
                                </div>

                                <ActionPopupWithButton
                                    button={
                                        <button
                                            className={classes.contributeButton}
                                        >
                                            Contribute
                                        </button>
                                    }
                                    popupTitle={'Contribute'}
                                    variant={'marketplace'}
                                >
                                    <Contribute dataset={dataset} />
                                </ActionPopupWithButton>

                                <button
                                    className={classes.downloadButton}
                                    onClick={() => downloadDataset(dataset._id)}
                                >
                                    <ReactSVG
                                        className={classes.imageTagIcon}
                                        src={download.src}
                                    />

                                    <span>
                                        Download (
                                        {formatFileSize(
                                            dataset.size.total.total
                                        )}
                                        )
                                    </span>
                                </button>
                            </div>
                        </div>
                        
                        {/* second row: description */}
                        <div className={classes.descriptionContainer}>
                            {/* title */}
                            <div className={classes.titleWrapper}>
                                <div className={classes.titleContainer}>
                                    <h2 className={classes.datasetTitle}>
                                        {dataset.name}
                                    </h2>

                                    <div className={classes.tagsContainer}>
                                        {dataset.tags.map((tag) => {
                                            return (
                                                <span
                                                    className={
                                                        classes.datasetTag
                                                    }
                                                    key={tag}
                                                >
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>

                                <span className={classes.datasetNick}>
                                    @{dataset.user.username}
                                </span>
                            </div>

                            {/* description */}
                            <div className={classes.descriptionWrapper}>
                                <p>{dataset.description}</p>
                            </div>

                            {/* licence */}
                            <div className={classes.licenceWrapper}>
                                <ReactSVG
                                    className={classes.imageTagIcon}
                                    src={cpu.src}
                                />
                                Creative Commons
                            </div>
                        </div>
                    </div>

                    {/* action menu */}
                    <div className={classes.actionMenuContainer}>
                        {/* button group */}
                        <RadioButtons
                            options={[
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
                                }
                            ]}
                            isLink={true}
                        />

                        {/* specification */}
                        <div className={classes.specificationWrapper}>
                            <div className={classes.specificationContainer}>
                                <div className={classes.specificationItem}>
                                    <span
                                        className={
                                            classes.specificationItemTitle
                                        }
                                    >
                                        {dataset.assetCounts.total}
                                    </span>

                                    <small>Files</small>
                                </div>

                                <div
                                    className={classes.specificationSeparator}
                                />
                                <div className={classes.specificationItem}>
                                    <span
                                        className={
                                            classes.specificationItemTitle
                                        }
                                    >
                                        {dataset.metrics.downloads}
                                    </span>

                                    <small>Downloads</small>
                                </div>

                                <div
                                    className={classes.specificationSeparator}
                                />

                                <div className={classes.specificationItem}>
                                    <span
                                        className={
                                            classes.specificationItemTitle
                                        }
                                    >
                                        {dayjs(dataset.createdAt).fromNow()}
                                    </span>

                                    <small>Created at</small>
                                </div>

                                <div
                                    className={classes.specificationSeparator}
                                />

                                <div className={classes.specificationItem}>
                                    <span
                                        className={
                                            classes.specificationItemTitle
                                        }
                                    >
                                        {dayjs(dataset.updatedAt).fromNow()}
                                    </span>

                                    <small>Last Updated</small>
                                </div>

                                <div
                                    className={classes.specificationSeparator}
                                />

                                <div className={classes.specificationItem}>
                                    <span
                                        className={
                                            classes.specificationItemTitle
                                        }
                                    >
                                        {dataset.contributors}
                                    </span>

                                    <small>Contributors</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {props.children}
            </div>
        </DatasetInfoContext.Provider>
    );
}
