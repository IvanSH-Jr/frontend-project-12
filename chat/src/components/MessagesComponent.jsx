import { Formik, Form } from 'formik';
import {
  FormControl, Button, FormFloating, FormLabel,
} from 'react-bootstrap';

const MessagesComponent = () => {
  const handleFormSubmit = ({ message }) => console.log(message);
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># channel</b>
          </p>
          <span className="text-muted">0 сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          Переписка чат и тд
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            initialValues={{ message: '' }}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              handleChange,
            }) => (
              <Form className="py-1 border rounded-2">
                <FormFloating className="mb-3">
                  <FormControl
                    name="message"
                    id="message"
                    value={values.username}
                    onChange={handleChange}
                    autoFocus
                  />
                  <FormLabel htmlFor="message">Ваше сообщение...</FormLabel>
                  <Button type="submit" variant="outline-primary" className="w-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </Button>
                </FormFloating>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;
