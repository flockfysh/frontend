import { IBellNotification } from './types';
import styles from './styles.module.css';
import Link from 'next/link';
import dayjs from 'dayjs';

type AppProps = {
    notification: IBellNotification
    lastSeenDate: dayjs.Dayjs
    setOpen?: (value: boolean) => void
}

const Notification = (props: AppProps) => {
    return (
        <Link 
        onClick={ () => {
            if(props.setOpen) props.setOpen(false);
        } }
        href={ props.notification.link ?? '/' }>
            <div className={ styles.notification }>
                <div className={ styles.notificationImage }>
                    { props.lastSeenDate && (
                        <div className={ styles.notificationDot } style={ {
                            backgroundColor: props.lastSeenDate.isAfter(props.notification.createdAt) ? '' : '#3192E3'
                        } } />
                    ) }
                    <img src={ props.notification.origin?.picture ?? '' } alt="avatar"
                        width={ 32 } height={ 32 } style={ { borderRadius: '50%', minWidth: '32px' } }
                    />
                </div>
                <div className={ styles.notificationContent }>
                    <h1 className={ styles.notificationContentHeading }>
                        { props.notification.text }
                    </h1>
                    <p className={ styles.notificationContentText }>
                        { dayjs(props.notification.createdAt).fromNow(true) }
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Notification;
