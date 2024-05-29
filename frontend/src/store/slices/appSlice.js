import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: '1',
  currentChannelName: 'general',
  modalChannelId: '',
  modalChannelName: '',
  modalType: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    setActiveChannel: (state, action) => {
      const { name, id } = action.payload;
      state.currentChannelId = id;
      state.currentChannelName = name;
    },
    setChannelModal: (state, action) => {
      state.modalChannelId = action.payload.id;
      state.modalChannelName = action.payload.name;
      state.modalType = action.payload.modalType;
    },
  },
});

export const {
  setActiveChannel, setChannelModal,
} = appSlice.actions;
export default appSlice.reducer;
