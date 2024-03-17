import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCurrentToken } from './authSlice.js';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = getCurrentToken(getState());

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    addMessage: builder.mutation({
      query: (message) => ({
        url: '',
        method: 'POST',
        body: message,
      }),
    }),
    getMessages: builder.query({
      query: () => '',
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
    editMessage: builder.mutation({
      query: (id, message) => ({
        url: id,
        method: 'PATCH',
        body: message,
      }),
    }),
  }),
});

const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
  useEditMessageMutation,
} = messagesApi;

export {
  useGetMessagesQuery as getMessages,
  useAddMessageMutation as addMessage,
  useRemoveMessageMutation as removeMessage,
  useEditMessageMutation as editMessage,
};
