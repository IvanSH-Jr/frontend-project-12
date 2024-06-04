import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { I18nextProvider, useTranslation } from 'react-i18next';
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
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
    const handleNewChannel = (newChannel) => {
      dispatch(
        channelsApi.util.updateQueryData(
          'getChannels',
          undefined,
          (draftChannels) => { draftChannels.push(newChannel); },
        ),
      );
      toast.success(t('chat.notify.addChannel'));
    };
    const handleRenameChannel = ({ id, name }) => {
      dispatch(
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
      toast.success(t('chat.notify.renameChannel'));
    };
    const handleDeleteChannel = ({ id }) => {
      dispatch(
        channelsApi.util.updateQueryData(
          'getChannels',
          undefined,
          (draft) => draft.filter((channel) => channel.id !== id),
        ),
      );
      toast.success(t('chat.notify.removeChannel'));
    };
    socket.connect();
    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('renameChannel', handleRenameChannel);
    socket.on('removeChannel', handleDeleteChannel);
    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('renameChannel');
      socket.off('removeChannel');
    };
  }, [dispatch, socket, t]);
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
