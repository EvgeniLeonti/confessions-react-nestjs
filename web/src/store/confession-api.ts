import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from "./store";
import i18n from "../i18n/i18n";
import * as qs from 'query-string';
import {Confession} from '../types/confession';
import {PaginationParams} from "../types/pagination-params";
import {ConfessionsResult} from "../types/list-result";
import {config} from "../core";

export const BASE_URL = config.api.origin;

// console.log('config', config)
// Define a service using a base URL and expected endpoints
export const confessionApi = createApi({
  reducerPath: 'confessionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const {accessToken} = (getState() as RootState).auth
      const {clientJs} = (getState() as RootState).app


      // If we have a token set in state, let's assume that we should be passing it.
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }

      if (clientJs) {
        headers.set('browser-fingerprint', clientJs.fingerprint)
      }

      return headers
    },

  }),
  tagTypes: ['Confession', 'User', 'Comment', 'Reactions'],
  endpoints: (builder) => ({
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
    getMe: builder.query({
      query: () => `users/me`,
    }),

    // confessions
    getConfessions: builder.query<ConfessionsResult, PaginationParams>({
      query: (query: PaginationParams) => {
        const queryString = query ? qs.stringify(query as any) : '';
        return `posts?lang=${i18n.language.split('-')[0]}&${queryString}`
      },
      providesTags: (result) =>
        result?.items ? result.items.map(({ id }) => ({ type: 'Confession', id })) : ['Confession']
    }),
    getConfession: builder.query({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Confession', id }],
    }),

    createConfession: builder.mutation<Confession, Partial<Confession>>({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Confession'],
    }),

    createComment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `posts/${id}/comments`,
        method: 'POST',
        body,
      }),
      // invalidatesTags: ['Comment'],
      invalidatesTags: (result, error, {id}) => {
        return [{ type: 'Comment', id }]
      },


    }),

    getComments: builder.query({
      query: ({id, ...body}) => {
        return {
          url: `posts/${id}/comments?${qs.stringify(body || {})}`,
          method: 'GET',
        }
      },
      providesTags: (result, error, {id}) => {
        console.log('providesTags', result, error, id)
        return [{ type: 'Comment', id }]
      },

      // providesTags: (result, error, page) =>
      //   result
      //     ? [
      //       // Provides a tag for each post in the current page,
      //       // as well as the 'PARTIAL-LIST' tag.
      //       ...result.items.map(({ id }) => ({ type: 'Comment' as const, id })),
      //       { type: 'Comment', id: 'PARTIAL-LIST' },
      //     ]
      //     : [{ type: 'Comment', id: 'PARTIAL-LIST' }],
    }),

    // reactions

    createReaction: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `posts/${id}/reactions`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, id) => ([{ type: 'Reactions', id: result.postId }]),
    }),

    getReactionsSummary: builder.query({
      query: ({ id }) => ({
        url: `posts/${id}/reactions/summary`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Reactions', id: result.postId }],
    }),

    deleteReaction: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `posts/${id}/reactions`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: (result, error, id) => ([{ type: 'Reactions', id: result.postId }]),
    }),

    // admin
    getAdminConfessions: builder.query<ConfessionsResult, string>({
      query: () => `admin/posts`,
      providesTags: (result) =>
        result?.items ? result.items.map(({ id }) => ({ type: 'Confession', id })) : ['Confession']
    }),

    patchConfession: builder.mutation<Confession, Partial<Confession> & Pick<Confession, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `admin/posts/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Confession'], // todo invalidate by id
    }),

    publishConfession: builder.mutation<Confession, Partial<Confession> & Pick<Confession, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `admin/posts/${id}/publish`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Confession'], // todo invalidate by id

      // todo invalidate by id
      // invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    draftConfession: builder.mutation<Confession, Partial<Confession> & Pick<Confession, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `admin/posts/${id}/draft`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Confession'],
    }),



  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = confessionApi
export const {
  // auth
  useSignupMutation,
  useLoginMutation,
  useGetMeQuery,

  // confessions
  useGetConfessionsQuery,
  useLazyGetConfessionsQuery,
  useCreateConfessionMutation,

  // comments
  useCreateCommentMutation,
  useLazyGetCommentsQuery,
  useGetCommentsQuery,

  // reactions
  useCreateReactionMutation,
  useGetReactionsSummaryQuery,
  useDeleteReactionMutation,

  useGetAdminConfessionsQuery,
  usePatchConfessionMutation,
  usePublishConfessionMutation,
  useDraftConfessionMutation,

} = confessionApi
