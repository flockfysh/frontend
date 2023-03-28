import { createWebSocket } from './webSocket';
import { NotificationData, sendNotification } from './notifications';
import { delay } from '../helpers/timers';

function socketRound() {
    return new Promise<void>(resolve => {
        const notificationSocket = createWebSocket('/api/notifications');

        notificationSocket.addMessageListener<NotificationData>('notification', async function (data) {
            await sendNotification(data);
        });

        notificationSocket.addEventListener('close', () => {
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

async function pingActive() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        console.log('Service thread active.');
        await delay(2);
    }
}

main();
pingActive();
