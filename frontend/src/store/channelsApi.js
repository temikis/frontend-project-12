import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCurrentToken } from './authSlice.js';
import { setActiveChannel, getCurrentDefaultChannel, getCurrentActiveChannel } from './uiSlice.js';
import socket from '../utils/socketApi.js';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const token = getCurrentToken(getState());

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    addChannel: builder.mutation({
      query: (channel) => ({
        url: '',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
    getChannels: builder.query({
      query: () => '',
      async onCacheEntryAdded(
        _arg,
        {
          dispatch,
          getState,
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        },
      ) {
        try {
          await cacheDataLoaded;

          const listenerAdd = (event) => {
            updateCachedData((draft) => {
              draft.push(event);
            });
          };

          const listenerDelete = (event) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((item) => item.id === event.id);
              if (index !== -1) { draft.splice(index, 1); }
              const activeChannel = getCurrentActiveChannel(getState());
              if (event.id === activeChannel.id) {
                const defaultChannel = getCurrentDefaultChannel(getState());
                dispatch(setActiveChannel(defaultChannel));
              }
            });
          };

          const listenerEdit = (event) => {
            updateCachedData((draft) => {
              const channel = draft.find((item) => item.id === event.id);
              channel.name = event.name;
              if (channel) { channel.name = event.name; }
            });
          };

          socket.on('newChannel', listenerAdd);
          socket.on('removeChannel', listenerDelete);
          socket.on('renameChannel', listenerEdit);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;
        socket.removeAllListeners('newChannel');
        socket.removeAllListeners('removeChannel');
        socket.removeAllListeners('renameChannel');
      },
      providesTags: (result) => (
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Channels', id })),
            { type: 'Channels', id: 'LIST' },
          ]
          : [{ type: 'Channels', id: 'LIST' }]),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
    editChannel: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: id,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
  }),
});

const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useEditChannelMutation,
} = channelsApi;

export {
  useGetChannelsQuery as getChannels,
  useAddChannelMutation as addChannel,
  useRemoveChannelMutation as removeChannel,
  useEditChannelMutation as editChannel,
};
