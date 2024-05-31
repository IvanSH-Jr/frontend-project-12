import { useTranslation } from 'react-i18next';
import { Modal, Button, FormControl } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useRef, useEffect } from 'react';
import filter from 'leo-profanity';
import { useEditChannelMutation } from '../api/channelsApi';

const RenameChannel = ({
  onHide,
  modalType,
  validation,
  modalId,
  modalChannelName,
}) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.select();
  });
  const { t } = useTranslation();
  const [editChannel] = useEditChannelMutation();
  const handleFormSubmit = async ({ channelName }) => {
    const cleanChannelName = filter.clean(channelName);
    await editChannel({ id: modalId, name: cleanChannelName });
    onHide();
  };
  return (
    <Modal show={modalType === 'renaming'} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.renameChannelHeader')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: modalChannelName }}
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

export default RenameChannel;
