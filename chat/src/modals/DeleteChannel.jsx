import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useRemoveChannelMutation } from '../api/channelsApi';
import { setActiveChannel } from '../store/slices/appSlice';

const DeleteChannel = ({
  onHide,
  modalType,
  modalId,
  dispatch,
}) => {
  const [removeChannelById] = useRemoveChannelMutation();
  const handleFormSubmit = async () => {
    console.log(modalId);
    await removeChannelById(modalId);
    const defaultChannel = { id: '1', name: 'general' };
    dispatch(setActiveChannel(defaultChannel));
    onHide();
  };
  return (
    <Modal show={modalType === 'removing'} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={modalId}
        >
          {() => (
            <Form>
              <p>Уверены?</p>
              <div className="d-flex justify-content-end mt-2">
                <Button type="button" variant="secondary" onClick={onHide} className="me-2">Отменить</Button>
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
