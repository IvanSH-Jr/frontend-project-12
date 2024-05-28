import { io } from 'socket.io-client';
import ReactDOM from 'react-dom/client';
import Init from './Init';

const chatApp = async () => {
  const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
  const socket = io(URL, {
    autoConnect: false,
  });
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await Init(socket));
};

chatApp();
