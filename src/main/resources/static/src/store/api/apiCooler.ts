import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cooler } from '../../types/Cooler'; // Определите тип Cooler
import { ApiResponse } from '../../types/Response'; // Тип для стандартного ответа API

export const apiCooler = createApi({
    reducerPath: 'apiCooler',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Cooler'],
    endpoints: (builder) => ({
        getCoolers: builder.query<Cooler[], void>({
            query: () => 'cooler',
            transformResponse: (response: ApiResponse<Cooler[]>) => response.data || [],
            providesTags: ['Cooler'],
        }),
        getCoolerById: builder.query<Cooler, number>({
            query: (id) => `cooler/${id}`,
            transformResponse: (response: ApiResponse<Cooler>) => response.data as Cooler,
            providesTags: (result, error, id) => [{ type: 'Cooler', id }],
        }),
        createCooler: builder.mutation<Cooler, Partial<Cooler>>({
            query: (newCooler) => ({
                url: 'cooler',
                method: 'POST',
                body: newCooler,
            }),
            transformResponse: (response: ApiResponse<Cooler>) => response.data as Cooler,
            invalidatesTags: ['Cooler'],
        }),
        updateCooler: builder.mutation<Cooler, Cooler>({
            query: (updatedCooler) => ({
                url: 'cooler',
                method: 'PUT',
                body: updatedCooler,
            }),
            transformResponse: (response: ApiResponse<Cooler>) => response.data as Cooler,
            invalidatesTags: (result, error, { id }) => [{ type: 'Cooler', id }],
        }),
        deleteCooler: builder.mutation<void, number>({
            query: (id) => ({
                url: `cooler/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Cooler', id }],
        }),
        uploadImage: builder.mutation<string, { id: number; file: File }>({
            query: ({ id, file }) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: `cooler/${id}/upload-image`, // Убедитесь, что URL правильный, включая слеш в конце
                    method: 'POST',
                    body: formData,
                    // Content-Type будет установлен автоматически для multipart запросов
                };
            },
            transformResponse: (response: ApiResponse<string>) => response.data as string,
            invalidatesTags: (result, error, { id }) => [{ type: 'Cooler', id }],
        }),
    }),
});

export const {
    useGetCoolersQuery,
    useGetCoolerByIdQuery,
    useCreateCoolerMutation,
    useUpdateCoolerMutation,
    useDeleteCoolerMutation,
    useUploadImageMutation
} = apiCooler;
