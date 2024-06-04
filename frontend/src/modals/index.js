import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setChannelModal } from '../slices/appSlice.js';
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
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const modalChannelId = useSelector((state) => state.app.modalChannelId);
  const modalChannelName = useSelector((state) => state.app.modalChannelName);
  const modalType = useSelector((state) => state.app.modalType);
  const channelsNames = channels.map((channel) => channel.name);
  const channelNameSchema = Yup.object().shape({
    channelName: Yup
      .string()
      .notOneOf(channelsNames, t('chat.modals.errors.uniqueName'))
      .min(3, t('chat.modals.errors.shortChannelName'))
      .max(20, t('chat.modals.errors.longChannelName'))
      .required(t('chat.modals.errors.requiredField')),
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
