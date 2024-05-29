import { createContext } from 'react';

export const SocketContext = createContext({
  socket: {},
});

const SocketProvider = ({ socket, children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export default SocketProvider;
