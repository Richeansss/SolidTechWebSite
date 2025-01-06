import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Socket } from '../../types/Socket'; // Тип для сокета
import { ApiResponse } from '../../types/Response'; // Тип для стандартного ответа API

export const apiSocket = createApi({
    reducerPath: 'apiSocket',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/socket',
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
    tagTypes: ['Socket'],
    endpoints: (builder) => ({
        getSockets: builder.query<Socket[], void>({
            query: () => '',
            transformResponse: (response: ApiResponse<Socket[]>) => response.data || [],
            providesTags: ['Socket'],
        }),
        getSocketById: builder.query<Socket, number>({
            query: (id) => `${id}`,
            transformResponse: (response: ApiResponse<Socket>) => response.data as Socket,
            providesTags: (result, error, id) => [{ type: 'Socket', id }],
        }),
        createSocket: builder.mutation<Socket, Partial<Socket>>({
            query: (newSocket) => ({
                url: '',
                method: 'POST',
                body: newSocket,
            }),
            transformResponse: (response: ApiResponse<Socket>) => response.data as Socket,
            invalidatesTags: ['Socket'],
        }),
        updateSocket: builder.mutation<Socket, Socket>({
            query: (updatedSocket) => ({
                url: '',
                method: 'PUT',
                body: updatedSocket,
            }),
            transformResponse: (response: ApiResponse<Socket>) => response.data as Socket,
            invalidatesTags: (result, error, { id }) => [{ type: 'Socket', id }],
        }),
        deleteSocket: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Socket', id }],
        }),
    }),
});

export const {
    useGetSocketsQuery,
    useGetSocketByIdQuery,
    useCreateSocketMutation,
    useUpdateSocketMutation,
    useDeleteSocketMutation,
} = apiSocket;
