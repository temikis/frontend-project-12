import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { io } from 'socket.io-client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import { ToastContainer, Slide } from 'react-toastify';
import { FilterProvider } from './contexts/filterContex.jsx';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/App';
import resources from './locales/index.js';
import store from './store/index.js';
import { messagesApi } from './store/messagesApi.js';
import { channelsApi } from './store/channelsApi.js';
import { getCurrentActiveChannel, getCurrentDefaultChannel, setActiveChannel } from './store/uiSlice.js';

const init = async () => {
  const socket = io();

  const listenerAddChannel = (event) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      draft.push(event);
    }));
  };

  const listenerDeleteChannel = (event) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      const index = draft.findIndex((item) => item.id === event.id);
      if (index !== -1) { draft.splice(index, 1); }
      const activeChannel = getCurrentActiveChannel(store.getState());
      if (event.id === activeChannel.id) {
        const defaultChannel = getCurrentDefaultChannel(store.getState());
        store.dispatch(setActiveChannel(defaultChannel));
      }
    }));
  };

  const listenerEditChannel = (event) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      const channel = draft.find((item) => item.id === event.id);
      channel.name = event.name;
      if (channel) { channel.name = event.name; }
    }));
  };

  const listenerNewMessage = (event) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
      draft.push(event);
    }));
  };

  socket.on('newChannel', listenerAddChannel);
  socket.on('removeChannel', listenerDeleteChannel);
  socket.on('renameChannel', listenerEditChannel);
  socket.on('newMessage', listenerNewMessage);

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

  const rollbarConfig = {
    accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  return (
    <Provider store={store}>
      <React.StrictMode>
        <ProviderRollbar config={rollbarConfig}>
          <ErrorBoundary>
            <FilterProvider>
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
            </FilterProvider>
          </ErrorBoundary>
        </ProviderRollbar>
      </React.StrictMode>
    </Provider>
  );
};

export default init;
