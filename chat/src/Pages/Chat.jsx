import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { changeChannel } from '../store/slices/appSlice';
import { useGetChannelsQuery } from '../api/channelsApi';
import ChannelsComponent from '../components/ChannelsComponent';
import MessagesComponent from '../components/MessagesComponent';

const Channels = ({ channel }) => {
  const dispatch = useDispatch();
  const { currentChannelName } = useSelector((state) => state.app);
  const payload = {
    id: channel.id,
    name: channel.name,
  };
  const btnClassName = 'w-100 rounded-0 text-start';
  return (
    <Button
      variant={`${currentChannelName === channel.name ? 'secondary' : null}`}
      className={btnClassName}
      onClick={() => dispatch(changeChannel(payload))}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
};

const Chat = () => {
  const { data } = useGetChannelsQuery();
  const ulClass = `nav flex-column nav-pills nav-fill 
  px-2 mb-3 overflow-auto h-100 d-block`;
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsComponent>
          {
            data?.length
            && (
            <ul className={ulClass}>
              {
              data.map((item) => (
                <li key={item.id} className="nav-item w-100">
                  <Channels channel={item} />
                </li>
              ))
              }
            </ul>
            )
          }
        </ChannelsComponent>
        <MessagesComponent />
      </div>
    </div>
  );
};

export default Chat;
