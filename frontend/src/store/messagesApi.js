import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCurrentToken } from './authSlice.js';
import socket from '../utils/socketApi.js';

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
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    addMessage: builder.mutation({
      query: (message) => ({
        url: '',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
    getMessages: builder.query({
      query: () => '',
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;

          const listener = (event) => {
            updateCachedData((draft) => {
              draft.push(event);
            });
          };

          socket.on('newMessage', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;
        socket.removeAllListeners('newMessage');
      },
      providesTags: ['Messages'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
    editMessage: builder.mutation({
      query: (id, message) => ({
        url: id,
        method: 'PATCH',
        body: message,
      }),
      invalidatesTags: ['Messages'],
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
