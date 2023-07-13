import { useEffect } from 'react';
import SocketIOClient from 'socket.io-client';

const Messages = () => {
    useEffect(() => {
        const socket = SocketIOClient(
            process.env.NEXT_PUBLIC_BACKEND_URL, {
            withCredentials: true,
        });
        socket.on('connect', () => {
            console.log('connected');
            socket.send('Hello server!');
        });

        socket.on('message', (msg: string) => {
            socket.send('Hello server!');
            console.log(msg);
        });
    }, []);
  return <div></div>;
};

export default Messages;
