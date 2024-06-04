import ChannelsComponent from './ChannelsComponent';
import MessagesComponent from './MessagesComponent';

const Chat = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <ChannelsComponent />
      <MessagesComponent />
    </div>
  </div>
);

export default Chat;
