import { Modal, Button, FormControl } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChannelModal } from '../store/slices/appSlice';
import { useGetChannelsQuery, useEditChannelMutation } from '../api/channelsApi';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.select();
  });
  const { data: channels = [] } = useGetChannelsQuery();
  const modalType = useSelector((state) => state.app.modalType);
  const modalChannelName = useSelector((state) => state.app.modalChannelName);
  const modalChannelId = useSelector((state) => state.app.modalChannelId);
  const channelsNames = channels.map((channel) => channel.name);
  const channelNameSchema = Yup.object().shape({
    newName: Yup.string().notOneOf(channelsNames, 'DRY!').min(3, 'less than 3').max(20, 'large than 20')
      .required('required'),
  });
  const [editChannel] = useEditChannelMutation();
  const handleCloseModal = () => dispatch(setChannelModal({ id: '', name: '', modalType: '' }));
  const handleFormSubmit = async ({ newName }) => {
    await editChannel({ id: modalChannelId, name: newName });
    handleCloseModal();
  };
  return (
    <Modal show={modalType === 'rename-channel'} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ newName: modalChannelName }}
          validationSchema={channelNameSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values, handleChange, errors,
          }) => (
            <Form>
              <FormControl value={values.newName} ref={inputRef} name="newName" onChange={handleChange} id="newName" isInvalid={!!errors.newName} autoFocus />
              <FormControl.Feedback type="invalid">{errors.newName}</FormControl.Feedback>
              <div className="d-flex justify-content-end mt-2">
                <Button type="button" variant="secondary" onClick={handleCloseModal} className="me-2">Отменить</Button>
                <Button type="submit" variant="primary">Отправить</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
