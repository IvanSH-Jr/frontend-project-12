import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { setActiveChannel, setChannelModal } from '../store/slices/appSlice.js';
import { useGetChannelsQuery, channelsApi } from '../api/channelsApi.js';
import BasicModal from '../modals/index.js';
import socket from '../socket.js';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { currentChannelName } = useSelector((state) => state.app);
  const payload = {
    id: channel.id,
    name: channel.name,
  };
  const handleDropDown = (modalType, dropDownChannel) => {
    dispatch(setChannelModal({ id: dropDownChannel.id, name: dropDownChannel.name, modalType }));
  };
  return (
    channel.removable ? (
      <Dropdown
        as={ButtonGroup}
        className="w-100"
      >
        <Button
          className="w-100 rounded-0 text-start text-truncate"
          variant={`${currentChannelName === channel.name ? 'secondary' : null}`}
          onClick={() => dispatch(setActiveChannel(payload))}
        >
          {`# ${channel.name}`}
        </Button>
        <Dropdown.Toggle split variant={`${currentChannelName === channel.name ? 'secondary' : null}`} id={`dropdown-split-basic-${channel.id}`} />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleDropDown('removing', channel)}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDropDown('renaming', channel)}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <Button
        as={ButtonGroup}
        variant={`${currentChannelName === channel.name ? 'secondary' : null}`}
        className="w-100 text-start rounded-0 text-truncate"
        onClick={() => dispatch(setActiveChannel(payload))}
      >
        {`# ${channel.name}`}
      </Button>
    )
  );
};

const ChannelsComponent = () => {
  const { data: channels = [] } = useGetChannelsQuery();
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
  const renderModal = () => {
    const Component = BasicModal;
    return <Component />;
  };
  useEffect(() => {
    const handleNewChannel = (newChannel) => {
      dispatch(
        channelsApi.util.updateQueryData(
          'getChannels',
          undefined,
          (draftChannels) => { draftChannels.push(newChannel); },
        ),
      );
    };
    const handleRenameChannel = ({ id, name }) => {
      dispatch(
        channelsApi.util.updateQueryData(
          'getChannels',
          undefined,
          (draftChannels) => {
            const channelIndexToUpdate = draftChannels.findIndex((channel) => channel.id === id);
            const link = draftChannels;
            link[channelIndexToUpdate].name = name;
          },
        ),
      );
    };
    const handleDeleteChannel = ({ id }) => {
      dispatch(
        channelsApi.util.updateQueryData(
          'getChannels',
          undefined,
          (draft) => draft.filter((channel) => channel.id !== id),
        ),
      );
    };
    socket.connect();
    socket.on('newChannel', handleNewChannel);
    socket.on('renameChannel', handleRenameChannel);
    socket.on('removeChannel', handleDeleteChannel);
    return () => {
      socket.off('newChannel');
      socket.off('renameChannel');
      socket.off('removeChannel');
    };
  }, [dispatch]);
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => handleAddingChannel('adding')}
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
              <Channel channel={item} />
            </li>
          ))
        }
      </ul>
      {renderModal()}
    </div>
  );
};

export default ChannelsComponent;
