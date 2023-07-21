import Link from 'next/link';
import { ReactSVG } from 'react-svg';

import { dayjs } from '@/helpers/date';

import plus from '@/icons/main/plus-circle.svg';
import check from '@/icons/main/check.svg';
import close from '@/icons/main/x-circle.svg';
import info from '@/icons/main/info.svg';
import timer from '@/icons/main/timer.svg';
import commenting from '@/icons/main/message-square.svg';

import classes from './styles.module.css';

const statusesValues: Record<
    Flockfysh.PullRequestStatus,
    {
        icon: JSX.Element;
        label: string;
        styles?: string;
    }
> = {
    merged: {
        icon: <ReactSVG className={ classes.icon } src={ check.src } />,
        label: 'Accepted',
        styles: classes.statusAcceptedBorder,
    },
    rejected: {
        icon: <ReactSVG className={ classes.icon } src={ close.src } />,
        label: 'Rejected',
        styles: classes.statusRejectedBorder,
    },
    published: {
        icon: <ReactSVG className={ classes.icon } src={ info.src } />,
        label: 'In Review',
        styles: classes.statusInReviewBorder,
    },
    draft: {
        icon: <ReactSVG className={ classes.icon } src={ info.src } />,
        label: 'Draft',
        styles: classes.statusInReviewBorder,
    },
};

function StatusBadge({ status }: { status: Flockfysh.PullRequestStatus }) {
    const thisStatusContent = statusesValues[status];

    return (
        <div
            className={ `${classes.statusBadgeWrapper} ${thisStatusContent?.styles}` }
        >
            { thisStatusContent?.icon }

            <div className={ classes.statusBadgeSeparator } />
            <span>{ thisStatusContent?.label }</span>
        </div>
    );
}

export function ContributionItem({
    contribution,
    datasetId,
}: {
    datasetId: string;
    contribution: ExpandedPullRequest;
}) {
    return (
        <div className={ classes.itemContainer }>
            { /* header */ }
            <div className={ classes.headerWrapper }>
                <div className={ classes.titleWrapper }>
                    { /* title */ }
                    <Link
                        href={ `/marketplace/${datasetId}/contributions/${contribution._id}` }
                    >
                        <p className={ classes.title }>{ contribution.name }</p>
                    </Link>

                    { /* tags */ }
                    <div>
                        <StatusBadge status={ contribution.status } />
                    </div>
                </div>

                <div className={ classes.datetime }>
                    <ReactSVG className={ classes.icon } src={ timer.src } />
                    <span>{ dayjs(contribution.updatedAt).fromNow() }</span>
                </div>
            </div>

            { /* footer */ }
            <div className={ classes.footerWrapper }>
                <div className={ classes.itemContent }>
                    opened { dayjs(contribution.createdAt).fromNow() } by @
                    { contribution.user.username.slice(0, 16) }
                </div>

                <div className={ classes.itemStats }>
                    <div className={ classes.messageBadge }>
                        <ReactSVG className={ classes.icon } src={ plus.src } />
                        <span>{ contribution.stats.newAssets }</span>
                    </div>

                    <div className={ classes.messageBadge }>
                        <ReactSVG
                            className={ classes.icon }
                            src={ commenting.src }
                        />
                        
                        <span>{ contribution.stats.messages }</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
