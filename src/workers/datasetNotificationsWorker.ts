import { createWebSocket } from './webSocket';
import { NotificationData, sendNotification } from './notifications';

function socketRound() {
    return new Promise<void>(resolve => {
        const notificationSocket = createWebSocket('/api/notifications');
        console.log('Socket created.');

        notificationSocket.addMessageListener<NotificationData>('notification', async function (data) {
            await sendNotification(data);
        });

        notificationSocket.addEventListener('close', () => {
            console.log('Socket closing.');
            resolve();
        });
    });
}

async function main() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        await socketRound();
    }
}

main();
