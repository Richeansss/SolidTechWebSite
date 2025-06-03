import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Brand } from '../../types/Brand';
import { ApiResponse } from '../../types/Response';
import {BASE_URL} from "./configApi.ts"; // Импортируем тип ApiResponse
import Cookies from 'js-cookie';

const API_URL = `${BASE_URL}/api/v1/`;

export const brandApi = createApi({
    reducerPath: 'brandApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            // Пример добавления токена (если есть авторизация)
            const token = Cookies.get('jwt');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Brand'],
    endpoints: (builder) => ({
        getBrands: builder.query<Brand[], void>({
            query: () => 'brand',
            transformResponse: (response: ApiResponse<Brand[]>) => response.data || [], // Обработка возможного null
            providesTags: ['Brand'],
        }),
        getBrandById: builder.query<Brand, number>({
            query: (id) => `brand/${id}`,
            transformResponse: (response: ApiResponse<Brand>) => response.data as Brand, // Убедитесь, что data не null
            providesTags: (_result, _error, id) => [{ type: 'Brand', id }],
        }),
        createBrand: builder.mutation<Brand, Partial<Brand>>({
            query: (newBrand) => ({
                url: 'brand',
                method: 'POST',
                body: newBrand,
            }),
            transformResponse: (response: ApiResponse<Brand>) => response.data as Brand, // Убедитесь, что data не null
            invalidatesTags: ['Brand'],
        }),
        updateBrand: builder.mutation<Brand, Brand>({
            query: (updatedBrand) => ({
                url: 'brand',
                method: 'PUT',
                body: updatedBrand,
            }),
            transformResponse: (response: ApiResponse<Brand>) => response.data as Brand,
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Brand', id }],
        }),
        deleteBrand: builder.mutation<void, number>({
            query: (id) => ({
                url: `brand/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Brand', id }],
        }),
        // Новый эндпоинт для поиска брендов по имени
        searchBrandsByName: builder.query<Brand[], string>({
            query: (name) => `brand/search?name=${name}`, // Формируем запрос с параметром name
            transformResponse: (response: ApiResponse<Brand[]>) => response.data || [], // Обработка возможного null
            providesTags: ['Brand'],
        }),
    }),
});

export const {
    useGetBrandsQuery,
    useGetBrandByIdQuery,
    useCreateBrandMutation,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
    useSearchBrandsByNameQuery,  // Экспортируем хук для поиска
} = brandApi;
