import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chanelsApi = createApi({
  reducerPath: 'chanels',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/channels' }),
  endpoints: (builder) => ({
    getChanels: builder.query({
      query: () => '',
    }),
    getChanelById: builder.query({
      query: (id) => id,
    }),
    addChanel: builder.mutation({
      query: (chanel) => ({
        method: 'POST',
        body: chanel,
      }),
    }),
    removeChanel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});