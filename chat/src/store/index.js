import { configureStore } from '@reduxjs/toolkit';

import auth from './slices/authSlice.js';
import { channelsApi } from '../api/channelsApi.js';

export default configureStore({
  reducer: {
    auth,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware),
});
