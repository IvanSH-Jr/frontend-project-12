import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  FormControl,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import filter from 'leo-profanity';
import { setActiveChannel } from '../slices/appSlice';
import { useAddChannelMutation } from '../api/channelsApi';

const AddChannel = ({
  onHide,
  modalType,
  validation,
  dispatch,
}) => {
  const { t } = useTranslation();
  const [addChannel] = useAddChannelMutation();
  const handleFormSubmit = async ({ channelName }) => {
    const cleanChannelName = filter.clean(channelName);
    const body = { name: cleanChannelName };
    const { data: { id, name } } = await addChannel(body);
    dispatch(setActiveChannel({ id, name }));
    onHide();
  };
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <Modal show={modalType === 'adding'} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.addNewChannelHeader')}</Modal.Title>
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
              <FormControl value={values.channelName} ref={inputRef} name="channelName" onChange={handleChange} id="channelName" isInvalid={!!errors.channelName} />
              <label htmlFor="channelName" className="visually-hidden">
                {t('chat.modals.newChannelName')}
              </label>
              <FormControl.Feedback type="invalid">{errors.channelName}</FormControl.Feedback>
              <div className="d-flex justify-content-end mt-2">
                <Button type="button" variant="secondary" onClick={onHide} className="me-2">{t('chat.modals.declineButton')}</Button>
                <Button type="submit" variant="primary">{t('chat.modals.confirmButton')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
