import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MotherBoard } from '../../types/MotherBoard'; // Тип для материнской платы
import { ApiResponse } from '../../types/Response';
import {BASE_URL} from "./configApi.ts";
import Cookies from "js-cookie"; // Тип для стандартного ответа API

const API_URL = `${BASE_URL}/api/v1/motherboard`;

export const motherboardApi = createApi({
    reducerPath: 'motherboardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            // Добавьте токен, если необходима авторизация
            const token = Cookies.get('jwt');
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
            providesTags: (_result, _error, id) => [{ type: 'MotherBoard', id }],
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
            invalidatesTags: (_result, _error, { id }) => [{ type: 'MotherBoard', id }],
        }),
        deleteMotherBoard: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'MotherBoard', id }],
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
            invalidatesTags: (_result, _error, { id }) => [{ type: 'MotherBoard', id }],
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
} = motherboardApi;
