import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import { channelsApi } from './channelsApi.js';
import { messagesApi } from './messagesApi.js';

export default configureStore({
  reducer: {
    auth: authSlice,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware),
  devTools: true,
});
