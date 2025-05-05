import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PCComponent } from '../../types/PCComponent'; // Тип для PCComponent
import { ApiResponse } from '../../types/Response'; // Тип для стандартного ответа API

export const apiPCComponent = createApi({
    reducerPath: 'apiPCComponent',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/pc-components',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['PCComponent'],
    endpoints: (builder) => ({
        getPCComponents: builder.query<PCComponent[], void>({
            query: () => '',
            transformResponse: (response: ApiResponse<PCComponent[]>) => response.data || [],
            providesTags: ['PCComponent'],
        }),
        getPCComponentById: builder.query<PCComponent, number>({
            query: (id) => `${id}`,
            transformResponse: (response: ApiResponse<PCComponent>) => response.data as PCComponent,
            providesTags: (result, error, id) => [{ type: 'PCComponent', id }],
        }),
        createPCComponent: builder.mutation<PCComponent, Partial<PCComponent>>({
            query: (newComponent) => ({
                url: '',
                method: 'POST',
                body: newComponent,
            }),
            transformResponse: (response: ApiResponse<PCComponent>) => response.data as PCComponent,
            invalidatesTags: ['PCComponent'],
        }),
        updatePCComponent: builder.mutation<PCComponent, PCComponent>({
            query: (updatedComponent) => ({
                url: '',
                method: 'PUT',
                body: updatedComponent,
            }),
            transformResponse: (response: ApiResponse<PCComponent>) => response.data as PCComponent,
            invalidatesTags: (result, error, { id }) => [{ type: 'PCComponent', id }],
        }),
        deletePCComponent: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'PCComponent', id }],
        }),
        getPCComponentsByType: builder.query<PCComponent[], string>({
            query: (componentType) => `type/${componentType}`,
            transformResponse: (response: ApiResponse<PCComponent[]>) => response.data || [],
            providesTags: ['PCComponent'],
        }),
        getPCComponentDetails: builder.query<any, number>({
            query: (id) => `${id}/details`,
            transformResponse: (response: ApiResponse<any>) => response.data,
            providesTags: (result, error, id) => [{ type: 'PCComponent', id }],
        }),
    }),
});

export const {
    useGetPCComponentsQuery,
    useGetPCComponentByIdQuery,
    useCreatePCComponentMutation,
    useUpdatePCComponentMutation,
    useDeletePCComponentMutation,
    useGetPCComponentsByTypeQuery,
    useGetPCComponentDetailsQuery,
} = apiPCComponent;
