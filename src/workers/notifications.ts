import logoIcon from '../images/icons/logo.svg';

if (!(self instanceof ServiceWorkerGlobalScope)) {
    throw new Error();
}
const worker: ServiceWorkerGlobalScope = self;

export interface NotificationData {
    title: string,
    body: string,
    url?: string,
}

export async function sendNotification(data: NotificationData) {
    if (Notification.permission !== 'granted') return;

    await worker.registration.showNotification(data.title, {
        body: data.body,
        icon: logoIcon,
        data: {
            url: data.url,
        },
    });
}

self.addEventListener('notificationclick', function (e: NotificationEvent) {
    const url: string | undefined = e.notification.data.url;
    if (url) {
        window.open(url);
    }
});
