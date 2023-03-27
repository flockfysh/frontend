import { createWebSocket } from './webSocket';
import { NotificationData, sendNotification } from './notifications';

const notificationSocket = createWebSocket('/api/notifications');

notificationSocket.addMessageListener<NotificationData>('notification', async function (data) {
    await sendNotification(data);
});
