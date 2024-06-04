import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes.js';
import Header from './setHeader.js';

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.baseUrl(),
    prepareHeaders: Header,
    tagTypes: ['User'],
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: 'signup',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = userApi;
