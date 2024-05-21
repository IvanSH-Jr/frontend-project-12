import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes/routes';
import authHeader from './authHeader';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.channels(),
    prepareHeaders: authHeader,
    tagTypes: ['Channels'],
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    editChannel: builder.mutation({
      query: (data) => ({
        method: 'PATCH',
        url: data.id,
        body: data,
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
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
