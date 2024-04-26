import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (Headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        Headers.set('Authorization', `Bearer ${token}`);
      }
      return Headers;
    },
  }),
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

export const {
  useGetChannelsQuery,
  useGetChannelByIdQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
