import { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';

import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { useOnClickOutside } from 'usehooks-ts';

import OverlayScreen from './overlay';
import { IBellNotification } from './types';
import ModalScreen from './modal';

import api from '@/helpers/api';

import bell from '@/icons/main/bell.svg';

import classes from './styles.module.css';

export default function BellNotification() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<IBellNotification[]>([]);
    const [lastSeen, setLastSeen] = useState<dayjs.Dayjs>();
    const ref = useRef<HTMLDivElement>(null);
    const [viewAll, setViewAll] = useState(false);

    useEffect(() => {
        api.get<
            Api.Response<{
                notifications: IBellNotification[];
                lastChecked: string;
            }>
        >('/api/notifications/bell').then((res) => {
            setLastSeen(dayjs(res.data.data.lastChecked));
            setNotifications(res.data.data.notifications);
        });
    }, [open]);

    const markAllAsRead = () => {
        api.post('/api/notifications/bell/mark-read').then(() => {
            setLastSeen(dayjs());
        });
    };

    useOnClickOutside(ref, () => {
        setOpen(false);
        setViewAll(false);
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (open) {
                markAllAsRead();
            }
 else {
                setViewAll(false);
            }
        }, 10000);

        return () => {
            clearTimeout(timeout);
        };
    }, [open]);

    return (
        <div className={ classes.notificationContainer }>
            <ReactSVG
                onClick={ () => {
                    setOpen(!open);
                    setViewAll(false);
                } }
                src={ bell.src }
                className={ notifications ? classes.noticeIcon : classes.leftIcon }
            />

            { open && (
                <motion.div
                    animate={ {
                        width: viewAll ? '95vw' : '400px',
                        height: viewAll ? '95vh' : '',
                        boxShadow: viewAll ? '0px 4px 198px -1px #000' : '',
                    } }
                    ref={ ref }
                    style={ {
                        position: viewAll ? 'fixed' : 'absolute',
                        // move to center of screen if viewAll is true
                        top: viewAll ? '50%' : 'calc(100% + 10px)',
                        left: viewAll ? '50%' : 'calc(100% + 10px)',
                        transform: viewAll
                            ? 'translate(-50%, -50%)'
                            : 'translate(-50%, 0)',
                    } }
                    className={ classes.notificationBox }
                >
                    { viewAll ? (
                        <ModalScreen
                            lastSeen={ lastSeen ?? dayjs() }
                            notifications={ notifications }
                            setViewAll={ setViewAll }
                            markAllAsRead={ markAllAsRead }
                            setOpen={ setOpen }
                        />
                    ) : (
                        <OverlayScreen
                            lastSeen={ lastSeen ?? dayjs() }
                            notifications={ notifications }
                            setViewAll={ setViewAll }
                            markAllAsRead={ markAllAsRead }
                        />
                    ) }
                </motion.div>
            ) }
        </div>
    );
}
