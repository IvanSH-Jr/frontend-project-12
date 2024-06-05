import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { messagesApi } from './api/messagesApi.js';
import { channelsApi } from './api/channelsApi.js';
import App from './components/App.jsx';
import store from './slices/index.js';
import resources from './locales/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
/* eslint-disable react/destructuring-assignment */
const Init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n.init({
    lng: 'ru',
    resources,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

  const rollbarConfig = {
    accessToken: process.env.RollBar_Token,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: process.env.RollBar_App_Environment,
  };

  filter.loadDictionary('ru');
  filter.loadDictionary('en');

  const handleNewMessage = (newMessage) => {
    store.dispatch(
      messagesApi.util.updateQueryData(
        'getMessages',
        undefined,
        (draftMessages) => { draftMessages.push(newMessage); },
      ),
    );
    socket.off('newMessage');
  };
  const handleNewChannel = (newChannel) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannels) => { draftChannels.push(newChannel); },
      ),
    );
    toast.success(i18n.t('chat.notify.addChannel'));
    socket.off('newChannel');
  };
  const handleRenameChannel = ({ id, name }) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannels) => {
          const channelIndexToUpdate = draftChannels.findIndex((channel) => channel.id === id);
          const link = draftChannels;
          link[channelIndexToUpdate].name = name;
        },
      ),
    );
    toast.success(i18n.t('chat.notify.renameChannel'));
    socket.off('renameChannel');
  };
  const handleDeleteChannel = ({ id }) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draft) => draft.filter((channel) => channel.id !== id),
      ),
    );
    toast.success(i18n.t('chat.notify.removeChannel'));
    socket.off('removeChannel');
  };
  socket.connect();
  socket.on('newMessage', handleNewMessage);
  socket.on('newChannel', handleNewChannel);
  socket.on('renameChannel', handleRenameChannel);
  socket.on('removeChannel', handleDeleteChannel);

  return (
    <Provider store={store}>
      <React.StrictMode>
        <RollBarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ErrorBoundary>
        </RollBarProvider>
      </React.StrictMode>
    </Provider>
  );
};

export default Init;
