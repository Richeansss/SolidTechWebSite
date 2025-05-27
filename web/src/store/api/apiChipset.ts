import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Chipset } from '../../types/Chipset'; // Тип для чипсета
import { ApiResponse } from '../../types/Response';
import {BASE_URL} from "./configApi.ts";
import Cookies from "js-cookie"; // Тип для стандартного ответа API

const API_URL = `${BASE_URL}/api/v1/chipset`;

export const apiChipset = createApi({
    reducerPath: 'apiChipset',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = Cookies.get('jwt');
            // Добавьте токен, если необходима авторизация
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Chipset'],
    endpoints: (builder) => ({
        getChipsets: builder.query<Chipset[], void>({
            query: () => '',
            transformResponse: (response: ApiResponse<Chipset[]>) => response.data || [],
            providesTags: ['Chipset'],
        }),
        getChipsetById: builder.query<Chipset, number>({
            query: (id) => `${id}`,
            transformResponse: (response: ApiResponse<Chipset>) => response.data as Chipset,
            providesTags: (result, error, id) => [{ type: 'Chipset', id }],
        }),
        createChipset: builder.mutation<Chipset, Partial<Chipset>>({
            query: (newChipset) => ({
                url: '',
                method: 'POST',
                body: newChipset,
            }),
            transformResponse: (response: ApiResponse<Chipset>) => response.data as Chipset,
            invalidatesTags: ['Chipset'],
        }),
        updateChipset: builder.mutation<Chipset, Chipset>({
            query: (updatedChipset) => ({
                url: '',
                method: 'PUT',
                body: updatedChipset,
            }),
            transformResponse: (response: ApiResponse<Chipset>) => response.data as Chipset,
            invalidatesTags: (result, error, { id }) => [{ type: 'Chipset', id }],
        }),
        deleteChipset: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Chipset', id }],
        }),
    }),
});

export const {
    useGetChipsetsQuery,
    useGetChipsetByIdQuery,
    useCreateChipsetMutation,
    useUpdateChipsetMutation,
    useDeleteChipsetMutation,
} = apiChipset;
