import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Case } from '../../types/Case';

interface ApiResponse<T> {
    response: {
        code: number;
        description: string;
    };
    data: T;
}

export const apiSlice = createApi({
    reducerPath: 'api',
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
    tagTypes: ['Case'],
    endpoints: (builder) => ({
        getCases: builder.query<Case[], void>({
            query: () => 'case',
            transformResponse: (response: ApiResponse<Case[]>) => response.data, // Преобразование данных
            providesTags: ['Case'],
        }),
        getCaseById: builder.query<Case, number>({
            query: (id) => `case/${id}`,
            transformResponse: (response: ApiResponse<Case>) => response.data,
            providesTags: (result, error, id) => [{ type: 'Case', id }],
        }),
        createCase: builder.mutation<Case, Partial<Case>>({
            query: (newCase) => ({
                url: 'case',
                method: 'POST',
                body: newCase,
            }),
            transformResponse: (response: ApiResponse<Case>) => response.data,
            invalidatesTags: ['Case'],
        }),
        updateCase: builder.mutation<Case, Case>({
            query: (updatedCase) => ({
                url: 'case',
                method: 'PUT',
                body: updatedCase,
            }),
            transformResponse: (response: ApiResponse<Case>) => response.data,
            invalidatesTags: (result, error, { id }) => [{ type: 'Case', id }],
        }),
        deleteCase: builder.mutation<void, number>({
            query: (id) => ({
                url: `case/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Case', id }],
        }),
    }),
});

export const {
    useGetCasesQuery,
    useGetCaseByIdQuery,
    useCreateCaseMutation,
    useUpdateCaseMutation,
    useDeleteCaseMutation,
} = apiSlice;
