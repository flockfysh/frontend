import { ReactSVG } from 'react-svg';
import dayjs from 'dayjs';

import { IBellNotification } from './types';
import Notification from './notification';

import checkIcon from '@/icons/base/check-icon.svg';
import arrowRight from '@/icons/base/chevron-right.svg';

import classes from './styles.module.css';

type AppProps = {
    notifications: IBellNotification[];
    lastSeen: dayjs.Dayjs;
    setViewAll: (value: boolean) => void;
    markAllAsRead: () => void;
};

export default function OverlayScreen({
    notifications,
    lastSeen,
    setViewAll,
    markAllAsRead,
}: AppProps) {
    return (
        <>
            <div>
                <div className={ classes.notificationHeader }>
                    <h1>Notifications</h1>

                    <button
                        onClick={ markAllAsRead }
                        className={ classes.notificationMarkAsRead }
                        disabled={ notifications
                            .map((notification) => notification.createdAt)
                            .every((createdAt) => lastSeen?.isAfter(createdAt)) }
                    >
                        Mark all as read
                        <ReactSVG src={ checkIcon.src } />
                    </button>
                </div>

                <div className={ classes.notificationBody }>
                    { notifications.map((notification, idx) => (
                        <Notification
                            lastSeenDate={ lastSeen ?? dayjs() }
                            key={ idx }
                            notification={ notification }
                        />
                    )) }
                </div>
            </div>

            <button
                onClick={ () => {
                    setViewAll(true);
                } }
                className={ classes.notificationViewAllButton }
            >
                View All <ReactSVG src={ arrowRight.src } />
            </button>
        </>
    );
}
