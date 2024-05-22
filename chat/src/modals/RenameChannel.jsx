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
  console.log(validation);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.select();
  });
  const [editChannel] = useEditChannelMutation();
  const handleFormSubmit = async ({ newName }) => {
    console.log(newName);
    await editChannel({ id: modalId, name: newName });
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
          initialValues={{ newName: modalChannelName }}
          onSubmit={handleFormSubmit}
          validationSchema={validation}
        >
          {({
            values, handleChange, errors,
          }) => (
            <Form>
              <FormControl value={values.newName} ref={inputRef} name="newName" onChange={handleChange} id="newName" isInvalid={!!errors.newName} />
              <FormControl.Feedback type="invalid">{errors.newName}</FormControl.Feedback>
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
