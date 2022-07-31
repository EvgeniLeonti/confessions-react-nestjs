// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {RootState} from "./store";
import {useSelector} from "react-redux";
import i18n from "../i18n/i18n";
// import type { Pokemon } from './types'

export interface Api {
  id: string
  content: string
}

// todo use env var
export const BASE_URL = 'http://192.168.1.62:4000';

// Define a service using a base URL and expected endpoints
export const confessionApi = createApi({
  reducerPath: 'confessionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const {accessToken} = (getState() as RootState).auth


      // If we have a token set in state, let's assume that we should be passing it.
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }

      return headers
    },

  }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    // getPokemonByName: builder.query<Pokemon, string>({
    //   query: (name) => `pokemon/${name}`,
    // }),
    // auth
    signup: builder.mutation({
      query: (body) => ({
        url: `auth/signup`,
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `auth/login`,
        method: 'POST',
        body,
      }),
    }),

    // user
    getMe: builder.query<Api, string>({
      query: () => `users/me`,
    }),

    // confessions
    getConfessions: builder.query<Api, string>({
      query: () => `posts?lang=${i18n.language}`,
      providesTags: (result) =>
        result?.items ? result.items.map(({ id }) => ({ type: 'Posts', id })) : ['Posts']
    }),
    getConfession: builder.query({
      query: ({ id }) => ({
        url: `posts/${id}h`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),

    createConfession: builder.mutation<Api, Partial<Api>>({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),

    // admin
    getAdminConfessions: builder.query<Api, string>({
      query: () => `admin/posts`,
      providesTags: (result) =>
        result?.items ? result.items.map(({ id }) => ({ type: 'Posts', id })) : ['Posts']
    }),

    patchConfession: builder.mutation<Api, Partial<Api> & Pick<Api, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `admin/posts/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Posts'], // todo invalidate by id
    }),

    publishConfession: builder.mutation<Api, Partial<Api> & Pick<Api, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `admin/posts/${id}/publish`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'], // todo invalidate by id

      // todo invalidate by id
      // invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    draftConfession: builder.mutation<Api, Partial<Api> & Pick<Api, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `admin/posts/${id}/draft`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = confessionApi
export const {
  useSignupMutation,
  useLoginMutation,

  useGetMeQuery,

  useGetConfessionsQuery,
  useCreateConfessionMutation,

  useGetAdminConfessionsQuery,
  usePatchConfessionMutation,
  usePublishConfessionMutation,
  useDraftConfessionMutation,

} = confessionApi
