import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PC } from '../../types/PC'; // Тип для ПК
import { ApiResponse } from '../../types/Response'; // Тип для стандартного ответа API

export const apiPC = createApi({
    reducerPath: 'apiPC',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/pc',
        prepareHeaders: (headers, { getState }) => {
            // Добавьте токен, если необходима авторизация
            const token = (getState() as any).auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['PC'],
    endpoints: (builder) => ({
        getPCs: builder.query<PC[], void>({
            query: () => '',
            transformResponse: (response: ApiResponse<PC[]>) => response.data || [],
            providesTags: ['PC'],
        }),
        getPCById: builder.query<PC, number>({
            query: (id) => `${id}`,
            transformResponse: (response: ApiResponse<PC>) => response.data as PC,
            providesTags: (result, error, id) => [{ type: 'PC', id }],
        }),
        createPC: builder.mutation<PC, Partial<PC>>({
            query: (newPC) => ({
                url: '',
                method: 'POST',
                body: newPC,
            }),
            transformResponse: (response: ApiResponse<PC>) => response.data as PC,
            invalidatesTags: ['PC'],
        }),
        updatePC: builder.mutation<PC, PC>({
            query: (updatedPC) => ({
                url: '',
                method: 'PUT',
                body: updatedPC,
            }),
            transformResponse: (response: ApiResponse<PC>) => response.data as PC,
            invalidatesTags: (result, error, { id }) => [{ type: 'PC', id }],
        }),
        deletePC: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'PC', id }],
        }),
        uploadImage: builder.mutation<string, { id: number; file: File }>({
            query: ({ id, file }) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: `${id}/upload-image`, // Убедитесь, что URL правильный, включая слеш в конце
                    method: 'POST',
                    body: formData,
                    // Content-Type будет установлен автоматически для multipart запросов
                };
            },
            transformResponse: (response: ApiResponse<string>) => response.data as string,
            invalidatesTags: (result, error, { id }) => [{ type: 'PC', id }],
        }),
    }),
});

export const {
    useGetPCsQuery,
    useGetPCByIdQuery,
    useCreatePCMutation,
    useUpdatePCMutation,
    useDeletePCMutation,
    useUploadImageMutation
} = apiPC;
