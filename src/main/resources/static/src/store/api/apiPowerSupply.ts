import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PowerSupply } from '../../types/PowerSupply'; // Определите тип PowerSupply
import { ApiResponse } from '../../types/Response'; // Тип для стандартного ответа API

export const apiPowerSupply = createApi({
    reducerPath: 'apiPowerSupply',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/',
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
    tagTypes: ['PowerSupply'],
    endpoints: (builder) => ({
        getPowerSupplies: builder.query<PowerSupply[], void>({
            query: () => 'power-supply',
            transformResponse: (response: ApiResponse<PowerSupply[]>) => response.data || [],
            providesTags: ['PowerSupply'],
        }),
        getPowerSupplyById: builder.query<PowerSupply, number>({
            query: (id) => `power-supply/${id}`,
            transformResponse: (response: ApiResponse<PowerSupply>) => response.data as PowerSupply,
            providesTags: (result, error, id) => [{ type: 'PowerSupply', id }],
        }),
        createPowerSupply: builder.mutation<PowerSupply, Partial<PowerSupply>>({
            query: (newPowerSupply) => ({
                url: 'power-supply',
                method: 'POST',
                body: newPowerSupply,
            }),
            transformResponse: (response: ApiResponse<PowerSupply>) => response.data as PowerSupply,
            invalidatesTags: ['PowerSupply'],
        }),
        updatePowerSupply: builder.mutation<PowerSupply, PowerSupply>({
            query: (updatedPowerSupply) => ({
                url: 'power-supply',
                method: 'PUT',
                body: updatedPowerSupply,
            }),
            transformResponse: (response: ApiResponse<PowerSupply>) => response.data as PowerSupply,
            invalidatesTags: (result, error, { id }) => [{ type: 'PowerSupply', id }],
        }),
        deletePowerSupply: builder.mutation<void, number>({
            query: (id) => ({
                url: `power-supply/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'PowerSupply', id }],
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
            invalidatesTags: (result, error, { id }) => [{ type: 'PowerSupply', id }],
        }),
    }),
});

export const {
    useGetPowerSuppliesQuery,
    useGetPowerSupplyByIdQuery,
    useCreatePowerSupplyMutation,
    useUpdatePowerSupplyMutation,
    useDeletePowerSupplyMutation,
    useUploadImageMutation
} = apiPowerSupply;
