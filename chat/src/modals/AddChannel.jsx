import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  FormControl,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { setChannelModal, setActiveChannel } from '../store/slices/appSlice';
import { useAddChannelMutation, useGetChannelsQuery } from '../api/channelsApi';

const AddChannel = () => {
  const dispatch = useDispatch();
  const { data: channels = [] } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const modalType = useSelector((state) => state.app.modalType);
  const channelsNames = channels.map((channel) => channel.name);
  const channelNameSchema = Yup.object().shape({
    channelName: Yup.string().notOneOf(channelsNames, 'DRY!').min(3, 'less than 3').max(20, 'large than 20')
      .required('required'),
  });
  const handleCloseModal = () => dispatch(setChannelModal({ id: '', name: '', modalType: '' }));
  const handleFormSubmit = async ({ channelName }) => {
    const body = { name: channelName };
    const { data: { id, name } } = await addChannel(body);
    dispatch(setActiveChannel({ id, name }));
    handleCloseModal();
  };

  return (
    <Modal show={modalType === 'addChannel'} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          onSubmit={handleFormSubmit}
          validationSchema={channelNameSchema}
        >
          {({
            values, handleChange, errors,
          }) => (
            <Form>
              <FormControl value={values.channelName} name="channelName" onChange={handleChange} id="channelName" isInvalid={!!errors.channelName} autoFocus />
              <FormControl.Feedback type="invalid">{errors.channelName}</FormControl.Feedback>
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

export default AddChannel;
