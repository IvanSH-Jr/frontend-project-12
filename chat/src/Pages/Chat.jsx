import { useGetChannelsQuery } from '../api/channelsApi';
import ChatComponent from '../components/ChatComponent';

const Channels = ({ channelName }) => (
  <li className="nav-item w-100">
    <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
      <span className="me-1">#</span>
      {channelName}
    </button>
  </li>
);

const Chat = () => {
  const { data } = useGetChannelsQuery();
  const ulClass = `nav flex-column nav-pills nav-fill 
  px-2 mb-3 overflow-auto h-100 d-block`;
  return (
    <ChatComponent>
      {
        data?.length
        && (
        <ul className={ulClass}>
          {data.map((item) => <Channels key={item.id} channelName={item.name} />)}
        </ul>
        )
      }
    </ChatComponent>
  );
};

export default Chat;
