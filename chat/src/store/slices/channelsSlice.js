import { createSlice } from '@reduxjs/toolkit';

const baseChannel = {
  name: 'general',
  id: '1',
};

const initialState = {
  activeChannelName: baseChannel.name,
  activeChannelId: baseChannel.id,
};
/* eslint-disable no-param-reassign */
const channelsSlice = createSlice({
  name: 'channelsSlice',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      const { name, id } = action.payload;
      state.activeChannelId = id;
      state.activeChannelName = name;
    },
  },
});

export const { setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
