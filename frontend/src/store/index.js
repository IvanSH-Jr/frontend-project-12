import { configureStore } from '@reduxjs/toolkit';

import app from './slices/appSlice.js';
import auth from './slices/authSlice.js';
import { userApi } from '../api/userApi.js';
import { channelsApi } from '../api/channelsApi.js';
import { messagesApi } from '../api/messagesApi.js';

export default configureStore({
  reducer: {
    auth,
    app,
    [userApi.reducerPath]: userApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userApi.middleware, channelsApi.middleware, messagesApi.middleware),
});
