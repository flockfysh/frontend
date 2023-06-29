import { ReactSVG } from 'react-svg';
import classes from './styles.module.css';

import check from '@/icons/main/check.svg';
import close from '@/icons/main/x-circle.svg';
import info from '@/icons/main/info.svg';
import timer from '@/icons/main/timer.svg';
import commenting from '@/icons/main/message-square.svg';

const statuses = {
  accepted: '0',
  rejected: '1',
  inReview: '2',
};

const statusesValues = [
  {
    status: statuses.accepted,
    icon: <ReactSVG className={ classes.icon } src={ check.src } />,
    label: 'Accepted',
    styles: classes.statusAcceptedBorder,
  },
  {
    status: statuses.rejected,
    icon: <ReactSVG className={ classes.icon } src={ close.src } />,
    label: 'Rejected',
    styles: classes.statusRejectedBorder,
  },
  {
    status: statuses.inReview,
    icon: <ReactSVG className={ classes.icon } src={ info.src } />,
    label: 'In Review',
    styles: classes.statusInReviewBorder,
  },
];

const StatusBadge = ({ status }: { status: '0' | '1' | '2' }) => {
  const thisStatusContent = statusesValues.find(
    (item) => item.status === status
  );

  return (
    <div
      className={ `${classes.statusBadgeWrapper} ${thisStatusContent?.styles}` }
    >
      { thisStatusContent?.icon }
      <div className={ classes.statusBadgeSeparator } />
      <span>{ thisStatusContent?.label }</span>
    </div>
  );
};

interface TEMP_dataType {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  issue: string;
  user: string;
  status: string;
  messageCount: string;
}

export const ContributionItem = ({ data }: { data: TEMP_dataType }) => {
  return (
    <div className={ classes.itemContainer }>
      { /* header */ }
      <div className={ classes.headerWrapper }>
        <div className={ classes.titleWrapper }>
          { /* title */ }
          <div className={ classes.title }>{ data.title }</div>
          { /* tags */ }
          <div>
            <StatusBadge status={ data.status } />
          </div>
        </div>
        <div className={ classes.datetime }>
          <ReactSVG className={ classes.icon } src={ timer.src } />
          <span>{ data.updatedAt }</span>
        </div>
      </div>
      { /* footer */ }
      <div className={ classes.footerWrapper }>
        <div className={ classes.itemContent }>
          #{ data.issue } opened on { data.createdAt } by { data.user }
        </div>
        <div className={ classes.messageBadge }>
          <ReactSVG className={ classes.icon } src={ commenting.src } />
          <span>{ data.messageCount }</span>
        </div>
      </div>
    </div>
  );
};
