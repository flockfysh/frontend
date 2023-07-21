import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import {
    BsArrowLeftCircle,
    BsGrid3X3,
    BsReverseListColumnsReverse,
} from 'react-icons/bs';
import { AiOutlineFieldTime, AiOutlineFile } from 'react-icons/ai';
import { MdOpenInNew } from 'react-icons/md';

import { formToJSON } from 'axios';

import CustomSelect from '@/components/ui/input/select';
import AssetViewer from '../contributionDetailsGridView/contributionAssetViewer';

import api from '@/helpers/api';
import { dayjs } from '@/helpers/date';

import classes from './styles.module.css';

function UserCard(props: { user: RedactedUser }) {
    return (
        <Link
            className={ classes.username }
            href={ `/profile/${props.user.username}` }
        >
            <Image
                alt={ 'Profile picture' }
                width={ 24 }
                height={ 24 }
                src={ props.user.profilePhoto?.url ?? '' }
                className={ classes.userPicture }
            ></Image>
            <span> { props.user.fullName }</span>
        </Link>
    );
}

function Message(props: { message: ExpandedPullRequestMessage }) {
    return (
        <div className={ classes.message }>
            <div className={ classes.messageHeader }>
                <UserCard user={ props.message.user }></UserCard>
                <div className={ classes.time }>
                    <AiOutlineFieldTime/>
                    <h3>
                        { ' ' }
                        { Math.round(
                            Math.abs(
                                new Date().getTime() -
                                new Date(props.message.createdAt).getTime(),
                            ) / 3.6e6,
                        ) }{ ' ' }
                        hours ago
                    </h3>
                </div>
            </div>
            <p>{ props.message.message }</p>
        </div>
    );
}

export default function ContributionDetails(props: {
    dataset: PreviewDataset;
    contributionId: string;
}) {
    const router = useRouter();
    const dataset = props.dataset;

    dataset;

    const [curContribution, setCurContribution] =
        useState<ExpandedPullRequest | null>(null);
    const [messages, setMessages] = useState<ExpandedPullRequestMessage[]>([]);
    const [text, setText] = useState<string>('');
    const [showList, setShowList] = useState<boolean>(true);

    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'rejected', label: 'Reject' },
        { value: 'merged', label: 'Merge' },
        { value: 'published', label: 'Publish' },
    ];

    useEffect(() => {
        const getContributions = async () => {
            const contribution = (
                await api.get<Api.Response<ExpandedPullRequest>>(
                    `/api/pullRequests/${props.contributionId}`,
                    {
                        params: {
                            expand: 'user,stats',
                        },
                    },
                )
            ).data.data;
            
            setCurContribution(contribution);
            
            const tempMessages = (
                await api.get<Api.PaginatedResponse<ExpandedPullRequestMessage[]>>(
                    `/api/pullRequests/${props.contributionId}/messages`,
                    {
                        params: {
                            expand: 'user',
                            sort: 'createdAt',
                            ascending: true,
                        },
                    },
                )
            ).data.data;
            setMessages(tempMessages);
        };

        getContributions().then();
    }, [router.query.datasetId, props.contributionId]);

    async function changeText(e: ChangeEvent<HTMLTextAreaElement>) {
        setText(e.target.value);
    }

    function toggleViewToGrid() {
        setShowList(false);
    }

    function toggleViewToList() {
        setShowList(true);
    }

    async function submitMessage(elem: HTMLFormElement) {
        const fd = formToJSON(elem) as {
            status: string;
            comment: string;
        };

        if (fd.status) {
            await api.patch(
                '/api/pullRequests/' + curContribution!._id + '/status',
                { status: fd.status },
            );
        }

        await api.post(
            '/api/pullRequests/' + curContribution!._id + '/messages',
            { message: fd.comment },
        );

        setText('');
        const tempMessage = {
            message: fd.comment,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
            user: curContribution!.user,
            pullRequest: props.contributionId,
        };
        setMessages([...messages, tempMessage]);
    }

    if (!curContribution) {
        return <></>;
    }

    return (
        <>
            { showList && (
                <div className={ classes.pullRequestContent }>
                    <div className={ classes.pullRequestBody }>
                        <div className={ classes.bodyHeader }>
                            <button onClick={ 
                                    () => {
                                        router.back();
                                    }
                                }
                                className={ classes.backButton }>
                                <BsArrowLeftCircle/> Back
                            </button>
                            <h3>{ curContribution.name }</h3>
                            <h3 className={ classes.prNumber }>#1</h3>
                        </div>
                        <div className={ classes.message }>
                            <div className={ classes.messageHeader }>
                                <UserCard
                                    user={ curContribution.user }
                                ></UserCard>
                                <time className={ classes.time }>
                                    <AiOutlineFieldTime/>
                                    <h3>
                                        { ' ' }
                                        { dayjs(
                                            curContribution.createdAt,
                                        ).fromNow() }
                                    </h3>
                                </time>
                            </div>
                            <p>{ curContribution.description }</p>
                            <button
                                className={ classes.changesButton }
                                onClick={ toggleViewToGrid }
                            >
                                View Changes <MdOpenInNew/>
                            </button>
                        </div>
                        <div className={ classes.messageInfo }>
                            <span className={ classes.vl }/>
                            <p className={ classes.greenText }>+{ curContribution.stats.newAssets }</p>
                            <AiOutlineFile/>
                            <p className={ classes.redText }>-{ curContribution.stats.deletedAssets }</p>
                        </div>
                        <span className={ classes.dot }/>
                        { messages.map((message: ExpandedPullRequestMessage) => {
                            return (
                                <>
                                    <Message message={ message }></Message>
                                    <span className={ classes.vl } />
                                    <span className={ classes.dot } />
                                </>
                            );
                        }) }
                        <div className={ classes.card }>
                            <form
                                onSubmit={ (e) => {
                                    e.preventDefault();
                                    submitMessage(e.currentTarget);
                                } }
                            >
                                <div className={ classes.cardTop }>
                                    <h1 className={ classes.headerText }>
                                        Comment
                                    </h1>

                                    { curContribution.status !== 'merged' ? (
                                        <CustomSelect
                                            name="status"
                                            className={ classes.select }
                                            placeholder="Status"
                                            options={ statusOptions }
                                        />
                                    ) : (
                                        <></>
                                    ) }
                                </div>

                                <textarea
                                    value={ text }
                                    onChange={ changeText }
                                    className={ classes.commentField }
                                    required={ true }
                                    name="comment"
                                    placeholder="Add comment here..."
                                />

                                <button className={ classes.submitButton }>
                                    Comment
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className={ classes.pullRequestStats }>
                        <div className = { classes.statsBody }>
                            <div className={ classes.contributionStats }>
                                <h3>Contribution Stats</h3>
                                <div className={ classes.statsSummary }>
                                    <h3>Summary</h3>
                                </div>
                                <div className={ classes.statsDetails }>
                                    <h3>Details</h3>
                                </div>
                            </div>
                            <div className={ classes.status }>
                                <h3>Status</h3>
                            </div>
                        </div>
                        <h3 className={ classes.h3 }>Placeholder</h3>
                    </div>
                </div>
            ) }
            { !showList && (
                <div className={ classes.assetViewContainer }>
                    <div className={ classes.assetViewContainerHeader }>
                        <button
                            className={ classes.backButton }
                            onClick={ toggleViewToList }
                        >
                            <BsArrowLeftCircle/> Back
                        </button>
                        <h3>{ curContribution?.name }</h3>
                        <div className={ classes.toggleButtonsContainer }>
                            <button
                                className={ classes.toggleButton }
                                onClick={ toggleViewToGrid }
                            >
                                <BsGrid3X3/>
                            </button>

                            <button
                                className={ classes.toggleButton }
                                onClick={ toggleViewToList }
                            >
                                <BsReverseListColumnsReverse/>
                            </button>
                        </div>
                    </div>
                    <AssetViewer
                        contributionId={ props.contributionId }
                        searchQuery={ { displayName: undefined } }
                        showList={ false }
                    />
                </div>
            ) }
        </>
    );
}
