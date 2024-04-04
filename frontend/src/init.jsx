import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as ProviderRollerbar, ErrorBoundary } from '@rollbar/react';
import { ToastContainer, Slide } from 'react-toastify';
import filter from 'leo-profanity';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/App';
import resources from './locales/index.js';
import store from './store/index.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      debug: false,
    });

  filter.loadDictionary('ru');

  const rollbarConfig = {
    accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  return (
    <Provider store={store}>
      <React.StrictMode>
        <ProviderRollerbar config={rollbarConfig}>
          <ErrorBoundary>
            <I18nextProvider i18n={i18n}>
              <App />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Slide}
              />
            </I18nextProvider>
          </ErrorBoundary>
        </ProviderRollerbar>
      </React.StrictMode>
    </Provider>
  );
};

export default init;
