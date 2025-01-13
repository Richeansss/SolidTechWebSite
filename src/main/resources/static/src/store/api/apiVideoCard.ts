import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Videocard } from '../../types/VideoCard'; // Тип для видеокарты
import { ApiResponse } from '../../types/Response'; // Тип для стандартного ответа API

export const apiVideocard = createApi({
    reducerPath: 'apiVideocard',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/videocard',
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
    tagTypes: ['Videocard'],
    endpoints: (builder) => ({
        getVideocards: builder.query<Videocard[], void>({
            query: () => '',
            transformResponse: (response: ApiResponse<Videocard[]>) => response.data || [],
            providesTags: ['Videocard'],
        }),
        getVideocardById: builder.query<Videocard, number>({
            query: (id) => `${id}`,
            transformResponse: (response: ApiResponse<Videocard>) => response.data as Videocard,
            providesTags: (result, error, id) => [{ type: 'Videocard', id }],
        }),
        createVideocard: builder.mutation<Videocard, Partial<Videocard>>({
            query: (newVideocard) => ({
                url: '',
                method: 'POST',
                body: newVideocard,
            }),
            transformResponse: (response: ApiResponse<Videocard>) => response.data as Videocard,
            invalidatesTags: ['Videocard'],
        }),
        updateVideocard: builder.mutation<Videocard, Videocard>({
            query: (updatedVideocard) => ({
                url: '',
                method: 'PUT',
                body: updatedVideocard,
            }),
            transformResponse: (response: ApiResponse<Videocard>) => response.data as Videocard,
            invalidatesTags: (result, error, { id }) => [{ type: 'Videocard', id }],
        }),
        deleteVideocard: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Videocard', id }],
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
            invalidatesTags: (result, error, { id }) => [{ type: 'Videocard', id }],
        }),
    }),
});

export const {
    useGetVideocardsQuery,
    useGetVideocardByIdQuery,
    useCreateVideocardMutation,
    useUpdateVideocardMutation,
    useDeleteVideocardMutation,
    useUploadImageMutation,
} = apiVideocard;
