import { delay } from './timers';

export async function register() {
    const result = await Notification.requestPermission();
    if (result !== 'granted') {
        return;
    }
    const serviceWorker = await navigator.serviceWorker.register(new URL('../workers/datasetNotificationsWorker.ts', import.meta.url));
    await serviceWorker.update();
}
