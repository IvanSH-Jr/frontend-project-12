import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: '1',
  currentChannelName: 'general',
  modalChannelId: '',
  modalChannelName: '',
  showModal: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    changeChannel: (state, action) => {
      const { name, id } = action.payload;
      state.currentChannelId = id;
      state.currentChannelName = name;
    },
    setChannelModal: (state, action) => {
      state.modalChannelId = action.payload.id;
      state.modalChannelName = action.payload.name;
      state.showModal = action.payload.modalName;
    },
  },
});

export const {
  changeChannel, setChannelModal,
} = appSlice.actions;
export default appSlice.reducer;
