import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LightType } from '../../types/LightType';
import { ApiResponse } from '../../types/Response'; // Тип для обработки ответа

export const apiLightType = createApi({
    reducerPath: 'apiLightType',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/', // Убедитесь, что это соответствует вашему серверу
        prepareHeaders: (headers, { getState }) => {
            headers.set('Content-Type', 'application/json');
            const token = (getState() as any).auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['LightType'],
    endpoints: (builder) => ({
        getLightTypes: builder.query<LightType[], void>({
            query: () => 'light-type',
            transformResponse: (response: ApiResponse<LightType[]>) => response.data || [], // Обработка null
            providesTags: ['LightType'],
        }),
        getLightTypeById: builder.query<LightType, number>({
            query: (id) => `light-type/${id}`,
            transformResponse: (response: ApiResponse<LightType>) => response.data as LightType,
            providesTags: (result, error, id) => [{ type: 'LightType', id }],
        }),
        createLightType: builder.mutation<LightType, Partial<LightType>>({
            query: (newLightType) => ({
                url: 'light-type',
                method: 'POST',
                body: newLightType,
            }),
            transformResponse: (response: ApiResponse<LightType>) => response.data as LightType,
            invalidatesTags: ['LightType'],
        }),
        updateLightType: builder.mutation<LightType, LightType>({
            query: (updatedLightType) => ({
                url: 'light-type',
                method: 'PUT',
                body: updatedLightType,
            }),
            transformResponse: (response: ApiResponse<LightType>) => response.data as LightType,
            invalidatesTags: (result, error, { id }) => [{ type: 'LightType', id }],
        }),
        deleteLightType: builder.mutation<void, number>({
            query: (id) => ({
                url: `light-type/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'LightType', id }],
        }),
        // Новый эндпоинт для поиска брендов по имени
        searchLightTypeByName: builder.query<LightType[], string>({
            query: (name) => `light-type/search?name=${name}`, // Формируем запрос с параметром name
            transformResponse: (response: ApiResponse<LightType[]>) => response.data || [], // Обработка возможного null
            providesTags: ['LightType'],
        }),
    }),
});

export const {
    useGetLightTypesQuery,
    useGetLightTypeByIdQuery,
    useCreateLightTypeMutation,
    useUpdateLightTypeMutation,
    useDeleteLightTypeMutation,
    useSearchLightTypeByNameQuery,
} = apiLightType;
