import { configureStore } from '@reduxjs/toolkit';

import auth from './slices/authSlice.js';

export default configureStore({
  reducer: {
    auth,
  },
});
