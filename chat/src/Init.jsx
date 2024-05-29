import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import filter from 'leo-profanity';
import SocketProvider from './context/socketContext.js';
import App from './App.jsx';
import store from './store/index.js';
import resources from './locales/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n.init({
    lng: 'ru',
    resources,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

  filter.loadDictionary('ru');

  return (
    <Provider store={store}>
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </I18nextProvider>
      </React.StrictMode>
    </Provider>
  );
};

export default init;
