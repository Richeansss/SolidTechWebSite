import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LightType } from '../../types/LightType';
import { ApiResponse } from '../../types/Response';
import {BASE_URL} from "./configApi.ts";
import Cookies from "js-cookie"; // Тип для обработки ответа

const API_URL = `${BASE_URL}/api/v1/`;

export const lightTypeApi = createApi({
    reducerPath: 'lightTypeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL, // Убедитесь, что это соответствует вашему серверу
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            const token = Cookies.get('jwt');
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
            providesTags: (_result, _error, id) => [{ type: 'LightType', id }],
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
            invalidatesTags: (_result, _error, { id }) => [{ type: 'LightType', id }],
        }),
        deleteLightType: builder.mutation<void, number>({
            query: (id) => ({
                url: `light-type/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'LightType', id }],
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
} = lightTypeApi;
