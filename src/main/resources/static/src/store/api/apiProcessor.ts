import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Processor } from '../../types/Processor'; // Тип для процессора
import { ApiResponse } from '../../types/Response'; // Тип для стандартного ответа API

export const apiProcessor = createApi({
    reducerPath: 'apiProcessor',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/processor',
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
    tagTypes: ['Processor'],
    endpoints: (builder) => ({
        getProcessors: builder.query<Processor[], void>({
            query: () => '',
            transformResponse: (response: ApiResponse<Processor[]>) => response.data || [],
            providesTags: ['Processor'],
        }),
        getProcessorById: builder.query<Processor, number>({
            query: (id) => `${id}`,
            transformResponse: (response: ApiResponse<Processor>) => response.data as Processor,
            providesTags: (result, error, id) => [{ type: 'Processor', id }],
        }),
        createProcessor: builder.mutation<Processor, Partial<Processor>>({
            query: (newProcessor) => ({
                url: '',
                method: 'POST',
                body: newProcessor,
            }),
            transformResponse: (response: ApiResponse<Processor>) => response.data as Processor,
            invalidatesTags: ['Processor'],
        }),
        updateProcessor: builder.mutation<Processor, Processor>({
            query: (updatedProcessor) => ({
                url: '',
                method: 'PUT',
                body: updatedProcessor,
            }),
            transformResponse: (response: ApiResponse<Processor>) => response.data as Processor,
            invalidatesTags: (result, error, { id }) => [{ type: 'Processor', id }],
        }),
        deleteProcessor: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Processor', id }],
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
            invalidatesTags: (result, error, { id }) => [{ type: 'Processor', id }],
        }),
    }),
});

export const {
    useGetProcessorsQuery,
    useGetProcessorByIdQuery,
    useCreateProcessorMutation,
    useUpdateProcessorMutation,
    useDeleteProcessorMutation,
    useUploadImageMutation
} = apiProcessor;
