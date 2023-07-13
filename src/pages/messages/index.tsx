import { useEffect } from 'react';
import SocketIOClient from 'socket.io-client';

export default function Messages() {
    useEffect(() => {
        const socket = SocketIOClient(
            process.env.NEXT_PUBLIC_BACKEND_URL, {
            withCredentials: true,
        });

        socket.on('connect', () => {
            socket.send('Hello server!');
        });

        socket.on('message', (_msg: string) => {
            socket.send('Hello server!');
        });
    }, []);

  return <></>;
}
