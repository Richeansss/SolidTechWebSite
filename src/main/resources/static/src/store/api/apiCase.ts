import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Case } from '../../types/Case';
import { ApiResponse } from '../../types/Response'; // Импортируем тип ApiResponse

export const apiCase = createApi({
    reducerPath: 'apiCase',  // Уникальное имя для apiCase
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
            transformResponse: (response: ApiResponse<Case[]>) => response.data || [], // Обработка возможного null
            providesTags: ['Case'],
        }),
        getCaseById: builder.query<Case, number>({
            query: (id) => `case/${id}`,
            transformResponse: (response: ApiResponse<Case>) => response.data as Case, // Убедитесь, что data не null
            providesTags: (result, error, id) => [{ type: 'Case', id }],
        }),
        createCase: builder.mutation<Case, Partial<Case>>({
            query: (newCase) => ({
                url: 'case',
                method: 'POST',
                body: newCase,
            }),
            transformResponse: (response: ApiResponse<Case>) => response.data as Case, // Убедитесь, что data не null
            invalidatesTags: ['Case'],
        }),
        updateCase: builder.mutation<Case, Case>({
            query: (updatedCase) => ({
                url: 'case',
                method: 'PUT',
                body: updatedCase,
            }),
            transformResponse: (response: ApiResponse<Case>) => response.data as Case,
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
} = apiCase;
