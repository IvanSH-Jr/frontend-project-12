import { Modal, Button, FormControl } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useRef, useEffect } from 'react';
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
  const [editChannel] = useEditChannelMutation();
  const handleFormSubmit = async ({ channelName }) => {
    await editChannel({ id: modalId, name: channelName });
    // dispatch(setActiveChannel({ id: modalChannelId, name: modalChannelName }));
    onHide();
  };
  return (
    <Modal show={modalType === 'renaming'} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать</Modal.Title>
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

export default RenameChannel;
