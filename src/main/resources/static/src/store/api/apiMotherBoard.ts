import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MotherBoard } from '../../types/MotherBoard'; // Тип для материнской платы
import { ApiResponse } from '../../types/Response'; // Тип для стандартного ответа API

export const apiMotherBoard = createApi({
    reducerPath: 'apiMotherBoard',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/motherboard',
        prepareHeaders: (headers, { getState }) => {
            // Добавьте токен, если необходима авторизация
            const token = (getState() as any).auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['MotherBoard'],
    endpoints: (builder) => ({
        getMotherBoards: builder.query<MotherBoard[], void>({
            query: () => '',
            transformResponse: (response: ApiResponse<MotherBoard[]>) => response.data || [],
            providesTags: ['MotherBoard'],
        }),
        getMotherBoardById: builder.query<MotherBoard, number>({
            query: (id) => `${id}`,
            transformResponse: (response: ApiResponse<MotherBoard>) => response.data as MotherBoard,
            providesTags: (result, error, id) => [{ type: 'MotherBoard', id }],
        }),
        createMotherBoard: builder.mutation<MotherBoard, Partial<MotherBoard>>({
            query: (newMotherBoard) => ({
                url: '',
                method: 'POST',
                body: newMotherBoard,
            }),
            transformResponse: (response: ApiResponse<MotherBoard>) => response.data as MotherBoard,
            invalidatesTags: ['MotherBoard'],
        }),
        updateMotherBoard: builder.mutation<MotherBoard, MotherBoard>({
            query: (updatedMotherBoard) => ({
                url: '',
                method: 'PUT',
                body: updatedMotherBoard,
            }),
            transformResponse: (response: ApiResponse<MotherBoard>) => response.data as MotherBoard,
            invalidatesTags: (result, error, { id }) => [{ type: 'MotherBoard', id }],
        }),
        deleteMotherBoard: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'MotherBoard', id }],
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
            invalidatesTags: (result, error, { id }) => [{ type: 'MotherBoard', id }],
        }),
    }),
});

export const {
    useGetMotherBoardsQuery,
    useGetMotherBoardByIdQuery,
    useCreateMotherBoardMutation,
    useUpdateMotherBoardMutation,
    useDeleteMotherBoardMutation,
    useUploadImageMutation
} = apiMotherBoard;
