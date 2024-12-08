import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Case } from '../../types/Case';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
    tagTypes: ['Case'], // Для инвалидации кэша
    endpoints: (builder) => ({
        getCases: builder.query<Case[], void>({
            query: () => 'case',
            providesTags: ['Case'],
        }),
        getCaseById: builder.query<Case, number>({
            query: (id) => `case/${id}`,
            providesTags: (result, error, id) => [{ type: 'Case', id }],
        }),
        createCase: builder.mutation<Case, Partial<Case>>({
            query: (newCase) => ({
                url: 'case',
                method: 'POST',
                body: newCase,
            }),
            invalidatesTags: ['Case'],
        }),
        updateCase: builder.mutation<Case, Case>({
            query: (updatedCase) => ({
                url: 'case',
                method: 'PUT',
                body: updatedCase,
            }),
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
