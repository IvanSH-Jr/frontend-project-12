import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  FormControl,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { setActiveChannel } from '../store/slices/appSlice';
import { useAddChannelMutation } from '../api/channelsApi';

const AddChannel = ({
  onHide,
  modalType,
  validation,
  dispatch,
}) => {
  const [addChannel] = useAddChannelMutation();
  const handleFormSubmit = async ({ channelName }) => {
    const body = { name: channelName };
    const { data: { id, name } } = await addChannel(body);
    dispatch(setActiveChannel({ id, name }));
    onHide();
  };

  return (
    <Modal show={modalType === 'adding'} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          onSubmit={handleFormSubmit}
          validationSchema={validation}
        >
          {({
            values, handleChange, errors,
          }) => (
            <Form>
              <FormControl value={values.channelName} name="channelName" onChange={handleChange} id="channelName" isInvalid={!!errors.channelName} autoFocus />
              <FormControl.Feedback type="invalid">{errors.channelName}</FormControl.Feedback>
              <div className="d-flex justify-content-end mt-2">
                <Button type="button" variant="secondary" onClick={onHide} className="me-2">Отменить</Button>
                <Button type="submit" variant="primary">Отправить</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
