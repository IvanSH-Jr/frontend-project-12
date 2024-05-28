import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import {
  FormControl, FormGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMessagesQuery, useAddMessageMutation, messagesApi } from '../api/messagesApi';
import { SocketContext } from '../context/socketContext.js';

const Message = ({ messages }) => messages.map((message) => (
  <div className="text-break mb-2" key={message.id}>
    <b>{message.username}</b>
    :
    {' '}
    {message.body}
  </div>
));

const MessagesComponent = () => {
  const { t } = useTranslation();
  const socket = useContext(SocketContext);
  const { currentChannelName, currentChannelId } = useSelector((state) => state.app);
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data = [] } = useGetMessagesQuery();
  const [addMessage] = useAddMessageMutation();
  const handleFormSubmit = async ({ message }, { resetForm }) => {
    const payload = { body: message, channelId: currentChannelId, username };
    await addMessage(payload);
    resetForm();
  };
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      dispatch(
        messagesApi.util.updateQueryData(
          'getMessages',
          undefined,
          (draftMessages) => { draftMessages.push(newMessage); },
        ),
      );
    };
    socket.connect();
    socket.on('newMessage', handleNewMessage);
    return () => socket.off('newMessage');
  }, [dispatch, socket]);
  const filteredMessagesByChannelId = data.filter((m) => m.channelId === currentChannelId);
  const numberOfMessages = filteredMessagesByChannelId.length;
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {currentChannelName}
            </b>
          </p>
          <span className="text-muted">
            {t('chat.messageCount.message', { count: numberOfMessages })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          <Message
            messages={filteredMessagesByChannelId}
          />
        </div>
        <div className="mt-auto px-5 py-3">
          <FormGroup className="mt-auto px-5 py-3">
            <Formik
              initialValues={{ message: '' }}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                handleChange,
              }) => (
                <Form noValidate className="py-1 border rounded-2">
                  <FormGroup className="input-group has-validation">
                    <FormControl
                      type="text"
                      name="message"
                      id="message"
                      value={values.message}
                      onChange={handleChange}
                      autoFocus
                      placeholder={t('chat.newMessagePlaceholder')}
                    />
                    <button type="submit" className="btn btn-group-vertical">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                      </svg>
                      <span className="visually-hidden">{t('chat.sendMessageBtn')}</span>
                    </button>
                  </FormGroup>
                </Form>
              )}
            </Formik>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;
