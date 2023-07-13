import { useCallback, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';

import dayjs from 'dayjs';

import { IBellNotification } from '../types';
import Notification from '../notification';

import xCircle from '@/icons/base/x-circle.svg';
import checkIcon from '@/icons/base/check-icon.svg';

import classes from './styles.module.css';

type AppProps = {
    notifications: IBellNotification[];
    lastSeen: dayjs.Dayjs;
    setViewAll: (value: boolean) => void;
    markAllAsRead: () => void;
    setOpen: (value: boolean) => void;
};

export default function ModalScreen({
    notifications,
    lastSeen,
    markAllAsRead,
    setOpen,
}: AppProps) {
    const [activeResource, setActiveResource] =
        useState<string>('All Notifications');

    const getNotifications = useCallback(
        (key: string) => {
            if (key === 'All Notifications') return notifications;
            return notifications.filter((notification) => {
                return notification.resource === key;
            });
        },
        [notifications]
    );

    const getNotificationsList = useMemo(() => {
        const notificationResourceList: {
            name: string;
            count: number;
        }[] = [
            {
                count: notifications.length,
                name: 'All Notifications',
            },
        ];

        notifications.forEach((notification) => {
            const resource = notification.resource;

            if (
                !notificationResourceList.find(
                    (notificationResource) =>
                        notificationResource.name === resource
                )
            ) {
                notificationResourceList.push({
                    name: resource as string,
                    count: getNotifications(resource).length,
                });
            }
        });

        return notificationResourceList;
    }, [notifications, getNotifications]);

    return (
        <>
            <div>
                <div className={ classes.notificationModalHeader }>
                    <h1>Notifications</h1>
                    <button
                        className={ classes.allUnsetButton }
                        onClick={ () => setOpen(false) }
                    >
                        <ReactSVG width={ 32 } height={ 32 } src={ xCircle.src } />
                    </button>
                </div>
                <div className={ classes.contentRoot }>
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

                    <div className={ classes.content }>
                        <div className={ classes.filters }>
                            <h1>Filters</h1>

                            <div className={ classes.filtersList }>
                                { getNotificationsList.map(
                                    (notificationResource) => {
                                        return (
                                            <div
                                                key={ notificationResource.name }
                                                className={
                                                    classes.notificationListItem
                                                }
                                                data-active={
                                                    activeResource ===
                                                    notificationResource.name
                                                }
                                                onClick={ () => {
                                                    setActiveResource(
                                                        notificationResource.name
                                                    );
                                                } }
                                            >
                                                { notificationResource.name }
                                                <span>
                                                    { notificationResource.count }
                                                </span>
                                            </div>
                                        );
                                    }
                                ) }
                            </div>
                        </div>

                        <div className={ classes.list }>
                            { getNotifications(activeResource).map(
                                (notification, idx) => (
                                    <Notification
                                        setOpen={ setOpen }
                                        lastSeenDate={ lastSeen }
                                        key={ idx }
                                        notification={ notification }
                                    />
                                )
                            ) }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
