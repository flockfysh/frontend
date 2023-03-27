import logoIcon from '../images/icons/logo.svg';

if (!(self instanceof ServiceWorkerGlobalScope)) {
    throw new Error();
}
const worker: ServiceWorkerGlobalScope = self;

export interface NotificationData {
    title: string,
    body: string,
}

export async function sendNotification(data: NotificationData) {
    await worker.registration.showNotification(data.title, {
        body: data.body,
        icon: logoIcon,

    });
}
