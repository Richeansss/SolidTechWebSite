import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Brand } from '../../types/Brand';
import { ApiResponse } from '../../types/Response'; // Импортируем тип ApiResponse

export const apiBrand = createApi({
    reducerPath: 'apiBrand',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/', // Убедитесь, что это соответствует вашему серверу
        prepareHeaders: (headers, { getState }) => {
            headers.set('Content-Type', 'application/json');
            // Пример добавления токена (если есть авторизация)
            const token = (getState() as any).auth?.token;
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
            providesTags: (result, error, id) => [{ type: 'Brand', id }],
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
            invalidatesTags: (result, error, { id }) => [{ type: 'Brand', id }],
        }),
        deleteBrand: builder.mutation<void, number>({
            query: (id) => ({
                url: `brand/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Brand', id }],
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
} = apiBrand;
