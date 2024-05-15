import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes/routes';
import authHeader from './authHeader';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.messages(),
    prepareHeaders: authHeader,
    tagTypes: ['Messages'],
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: id,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
