import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { useGetChannelsQuery } from '../api/channelsApi';
import { setActiveChannel } from '../store/slices/channelsSlice';
import ChannelsComponent from '../components/ChannelsComponent';
import MessagesComponent from '../components/MessagesComponent';

const Channels = ({ channel }) => {
  const dispatch = useDispatch();
  const { activeChannelName } = useSelector((state) => state.channelsSlice);
  console.log(activeChannelName);
  const payload = {
    id: channel.id,
    name: channel.name,
  };
  const btnClassName = 'w-100 rounded-0 text-start';
  return (
    <li className="nav-item w-100">
      <Button
        variant={`${activeChannelName === channel.name ? 'secondary' : null}`}
        className={btnClassName}
        onClick={() => dispatch(setActiveChannel(payload))}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
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
              {data.map((item) => <Channels key={item.id} channel={item} />)}
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
