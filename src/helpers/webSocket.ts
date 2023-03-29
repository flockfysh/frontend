import * as settings from '../settings';
import path from 'path-browserify';

class AbstractWebSocket extends WebSocket {
    addMessageListener<T>(type: string, listener: (this: WebSocket, data: T) => any): void {
        this.addEventListener('message', function (ev) {
            const rawData = JSON.parse(ev.data);
            if (rawData.type === type) {
                return listener.call(this, rawData.data as T);
            }
        });
    }
}


export function createWebSocket(url: string): AbstractWebSocket {
    return new AbstractWebSocket(path.join(settings.socketIOServerURL, url));
}
