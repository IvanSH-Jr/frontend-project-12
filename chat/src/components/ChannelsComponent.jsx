import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { setActiveChannel, setChannelModal } from '../store/slices/appSlice';
import { useGetChannelsQuery, channelsApi } from '../api/channelsApi';
import AddChannel from '../modals/AddChannel';
import socket from '../socket';

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
      onClick={() => dispatch(setActiveChannel(payload))}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
};

const ChannelsComponent = () => {
  const { data: channels = [], refetch } = useGetChannelsQuery();
  const ulClass = `nav flex-column nav-pills nav-fill 
px-2 mb-3 overflow-auto h-100 d-block`;
  const dispatch = useDispatch();
  const handleAddingChannel = (type) => {
    const payload = {
      id: '',
      name: '',
      modalType: type,
    };
    dispatch(setChannelModal(payload));
  };
  useEffect(() => {
    const handleNewChannel = (newChannel) => {
      console.log(newChannel); // { id: 6, name: "new channel", removable: true }
      dispatch(
        channelsApi.util.updateQueryData(
          'getChannels',
          undefined,
          (draftChannels) => { draftChannels.push(newChannel); },
        ),
      );
    };
    socket.connect();
    socket.on('newChannel', handleNewChannel);
    return () => socket.off('newChannel');
  }, [dispatch, refetch]);
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => handleAddingChannel('addChannel')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className={ulClass}>
        {
          channels.map((item) => (
            <li key={item.id} className="nav-item w-100">
              <Channels channel={item} />
            </li>
          ))
        }
      </ul>
      <AddChannel />
    </div>
  );
};

export default ChannelsComponent;
