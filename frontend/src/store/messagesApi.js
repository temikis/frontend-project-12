import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCurrentToken } from './authSlice.js';
import routes from '../utils/routes.js';
import socket from '../utils/socketApi.js';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.messagesPath(),
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
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
    getMessages: builder.query({
      query: () => '',
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;

          const listenerNewMessage = (event) => {
            updateCachedData((draft) => {
              draft.push(event);
            });
          };

          socket.on('newMessage', listenerNewMessage);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;
        socket.removeAllListeners('newMessage');
      },
      providesTags: (result) => (
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Messages', id })),
            { type: 'Messages', id: 'LIST' },
          ]
          : [{ type: 'Messages', id: 'LIST' }]),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
    editMessage: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: id,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
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
