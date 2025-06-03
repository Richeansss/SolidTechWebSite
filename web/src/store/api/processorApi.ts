import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Processor } from '../../types/Processor'; // Тип для процессора
import { ApiResponse } from '../../types/Response';
import {BASE_URL} from "./configApi.ts";
import Cookies from "js-cookie"; // Тип для стандартного ответа API

const API_URL = `${BASE_URL}/api/v1/processor`;

export const processorApi = createApi({
    reducerPath: 'processorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            // Добавьте токен, если необходима авторизация
            const token = Cookies.get('jwt');
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
            providesTags: (_result, _error, id) => [{ type: 'Processor', id }],
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
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Processor', id }],
        }),
        deleteProcessor: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Processor', id }],
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
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Processor', id }],
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
} = processorApi;
