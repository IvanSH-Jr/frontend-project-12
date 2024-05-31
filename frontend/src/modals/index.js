import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { setChannelModal } from '../store/slices/appSlice.js';
import { useGetChannelsQuery } from '../api/channelsApi.js';
import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import DeleteChannel from './DeleteChannel.jsx';

const modals = {
  adding: AddChannel,
  removing: DeleteChannel,
  renaming: RenameChannel,
};

const BasicModal = () => {
  const dispatch = useDispatch();
  const { data: channels = [] } = useGetChannelsQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const modalChannelId = useSelector((state) => state.app.modalChannelId);
  const modalChannelName = useSelector((state) => state.app.modalChannelName);
  const modalType = useSelector((state) => state.app.modalType);
  const channelsNames = channels.map((channel) => channel.name);
  const channelNameSchema = Yup.object().shape({
    channelName: Yup.string().notOneOf(channelsNames, 'DRY!').min(3, 'less than 3').max(20, 'large than 20')
      .required('required'),
  });
  const handleCloseModal = () => dispatch(setChannelModal({ id: '', name: '', modalType: '' }));
  const Modal = modals[modalType];
  return (
    modalType ? (
      <Modal
        onHide={handleCloseModal}
        modalType={modalType}
        validation={channelNameSchema}
        channelId={currentChannelId}
        modalId={modalChannelId}
        modalChannelName={modalChannelName}
        dispatch={dispatch}
      />
    ) : null
  );
};

export default BasicModal;