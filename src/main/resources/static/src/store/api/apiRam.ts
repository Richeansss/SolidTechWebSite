import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Ram } from '../../types/Ram'; // Тип для оперативной памяти
import { ApiResponse } from '../../types/Response'; // Тип для стандартного ответа API

export const apiRam = createApi({
    reducerPath: 'apiRam',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/ram',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Ram'],
    endpoints: (builder) => ({
        getRams: builder.query<Ram[], void>({
            query: () => '',
            transformResponse: (response: ApiResponse<Ram[]>) => response.data || [],
            providesTags: ['Ram'],
        }),
        getRamById: builder.query<Ram, number>({
            query: (id) => `${id}`,
            transformResponse: (response: ApiResponse<Ram>) => response.data as Ram,
            providesTags: (result, error, id) => [{ type: 'Ram', id }],
        }),
        createRam: builder.mutation<Ram, Partial<Ram>>({
            query: (newRam) => ({
                url: '',
                method: 'POST',
                body: newRam,
            }),
            transformResponse: (response: ApiResponse<Ram>) => response.data as Ram,
            invalidatesTags: ['Ram'],
        }),
        updateRam: builder.mutation<Ram, Ram>({
            query: (updatedRam) => ({
                url: '',
                method: 'PUT',
                body: updatedRam,
            }),
            transformResponse: (response: ApiResponse<Ram>) => response.data as Ram,
            invalidatesTags: (result, error, { id }) => [{ type: 'Ram', id }],
        }),
        deleteRam: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Ram', id }],
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
            invalidatesTags: (result, error, { id }) => [{ type: 'Ram', id }],
        }),
    }),
});

export const {
    useGetRamsQuery,
    useGetRamByIdQuery,
    useCreateRamMutation,
    useUpdateRamMutation,
    useDeleteRamMutation,
    useUploadImageMutation
} = apiRam;
