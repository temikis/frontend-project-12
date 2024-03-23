import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCurrentToken } from './authSlice.js';
// import socket from '../utils/socketApi.js';

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
      invalidatesTags: ['Channels'],
    }),
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
    editChannel: builder.mutation({
      query: (id, channel) => ({
        url: id,
        method: 'PATCH',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
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
