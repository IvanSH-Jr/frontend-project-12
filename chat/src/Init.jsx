import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
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

  const rollbarConfig = {
    accessToken: process.env.RollBar_Token,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: process.env.RollBar_App_Environment,
  };

  filter.loadDictionary('ru');

  return (
    <Provider store={store}>
      <RollBarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <React.StrictMode>
            <I18nextProvider i18n={i18n}>
              <SocketProvider socket={socket}>
                <App />
              </SocketProvider>
            </I18nextProvider>
          </React.StrictMode>
        </ErrorBoundary>  
      </RollBarProvider>
    </Provider>
  );
};

export default init;
