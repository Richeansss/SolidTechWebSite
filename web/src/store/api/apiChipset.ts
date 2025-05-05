import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Chipset } from '../../types/Chipset'; // Тип для чипсета
import { ApiResponse } from '../../types/Response'; // Тип для стандартного ответа API

export const apiChipset = createApi({
    reducerPath: 'apiChipset',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/chipset',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Content-Type', 'application/json');
            // Добавьте токен, если необходима авторизация
            const token = (getState() as any).auth?.token;
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
