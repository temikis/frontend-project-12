import { io } from 'socket.io-client';

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'ws://localhost:5001';
// const socket = io(URL, {
//   autoConnect: true,
// });
const socket = io();
console.log('запущен сокет со следующим урлом:', socket);
console.log(socket);

export default socket;
