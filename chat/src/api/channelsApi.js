import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/channels' }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    getChannelById: builder.query({
      query: (id) => id,
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});