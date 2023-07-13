export interface NotificationData {
    title: string;
    body: string;
    url?: string;
}

if (!(self instanceof ServiceWorkerGlobalScope)) throw new Error();

const worker: ServiceWorkerGlobalScope = self;

export async function sendNotification(data: NotificationData) {
    if (Notification.permission !== 'granted') return;

    await worker.registration.showNotification(data.title, {
        body: data.body,
        data: {
            url: data.url,
        },
    });
}

worker.addEventListener('push', async function (evt) {
    const rawData = evt.data?.json();

    if (!rawData) return;

    evt.waitUntil(
        sendNotification({
            body: rawData.body,
            title: rawData.title,
        })
    );
});
