import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthRequest, IAuthResponse } from '../../types/types';
import {BASE_URL} from "./configApi.ts";

const API_URL =`${BASE_URL}/api/v3`;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    createAuthToken: builder.mutation<IAuthResponse, IAuthRequest>({
      query: (user) => ({
        url: '/auth/authenticate',
        method: 'POST',
        body: user,
      })
    }),
  }),
});

export const { useCreateAuthTokenMutation } = authApi;
