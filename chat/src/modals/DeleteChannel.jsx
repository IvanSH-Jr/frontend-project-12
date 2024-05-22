import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRemoveChannelMutation } from '../api/channelsApi';
import { setChannelModal, setActiveChannel } from '../store/slices/appSlice';

const DeleteChannel = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.app.modalType);
  // const modalChannelName = useSelector((state) => state.app.modalChannelName);
  const modalChannelId = useSelector((state) => state.app.modalChannelId);
  const [removeChannelById] = useRemoveChannelMutation();
  const handleCloseModal = () => dispatch(setChannelModal({ id: '', name: '', modalType: '' }));
  const handleFormSubmit = async () => {
    const res = await removeChannelById(modalChannelId);
    console.log(res);
    const defaultChannel = { id: '1', name: 'general' };
    dispatch(setActiveChannel(defaultChannel));
    handleCloseModal();
  };
  return (
    <Modal show={modalType === 'delete-channel'} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ modalChannelId }}
          onSubmit={handleFormSubmit}
        >
          {() => (
            <Form>
              <p>Уверены?</p>
              <div className="d-flex justify-content-end mt-2">
                <Button type="button" variant="secondary" onClick={handleCloseModal} className="me-2">Отменить</Button>
                <Button type="submit" variant="danger">Удалить</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannel;
