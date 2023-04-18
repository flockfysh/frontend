import api from '../helpers/api';
import React from 'react';
import { UserContext } from './userContext';
import { delay } from '../helpers/timers';

export default function NotificationWrapper() {
    const { curUser } = React.useContext(UserContext);
    const [worker, setWorker] = React.useState<ServiceWorkerRegistration | undefined>(undefined);

    async function registerNotificationWorker() {
        if(!navigator.serviceWorker) return;
        const serviceWorker = await navigator.serviceWorker.register(new URL('../workers/notifications.ts', import.meta.url));
        await serviceWorker.update();
        return serviceWorker;
    }

    React.useEffect(() => {
        registerNotificationWorker().then(worker => setWorker(worker));
    }, []);

    async function subscribeToNotifications(worker: ServiceWorkerRegistration) {
        const response = await api.get('/api/notifications/pushKey').then(res => res.data);
        const serverKey: string = response.data;

        async function newSubscription() {
            const workerSubscription = await worker.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: serverKey,
            });
            // eslint-disable-next-line no-constant-condition
            while (true) {
                try {
                    await api.post('/api/notifications/subscribe', {
                        subscription: workerSubscription,
                    });
                    break;
                }
 catch (e) {
                    await delay(5);
                }
            }
            return workerSubscription;
        }
        let curSubscription: PushSubscription | null = null;
        if(worker.pushManager){
            curSubscription = await worker.pushManager.getSubscription();
        }
        if (!curSubscription) {
            curSubscription = await newSubscription();
        }
        const appServerKey = curSubscription.options.applicationServerKey!;
        const decoded = btoa(String.fromCodePoint.apply(null, Array.from(new Uint8Array(appServerKey))));
        if (decoded.replace(/[^a-z0-9]/gi, '') !== serverKey.replace(/[^a-z0-9]/gi, '')) {
            await curSubscription.unsubscribe();
            curSubscription = await newSubscription();
        }
    }

    async function unsubscribeFromNotifications(worker: ServiceWorkerRegistration) {
        if(!worker.pushManager) return;
        const currentSubscription = await worker.pushManager.getSubscription();
        if (!currentSubscription) return;
        await currentSubscription.unsubscribe();
    }

    React.useEffect(() => {
        (async function () {
            if (worker) {
                if (!curUser) {
                    await unsubscribeFromNotifications(worker);
                }
                else {
                    await subscribeToNotifications(worker);
                }
            }
        })();
    }, [worker, curUser]);

    return <></>;
}
