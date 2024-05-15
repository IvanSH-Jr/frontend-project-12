import { configureStore } from '@reduxjs/toolkit';

import auth from './slices/authSlice.js';
import channelsSlice from './slices/channelsSlice.js';
import { channelsApi } from '../api/channelsApi.js';
import { messagesApi } from '../api/messagesApi.js';

export default configureStore({
  reducer: {
    auth,
    channelsSlice,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware),
});
