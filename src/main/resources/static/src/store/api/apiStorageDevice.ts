import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StorageDevice } from '../../types/StorageDevice'; // Определите тип StorageDevice
import { ApiResponse } from '../../types/Response'; // Тип для стандартного ответа API

export const apiStorageDevice = createApi({
    reducerPath: 'apiStorageDevice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/', // URL вашего API
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
    tagTypes: ['StorageDevice'],
    endpoints: (builder) => ({
        getStorageDevices: builder.query<StorageDevice[], void>({
            query: () => 'storage-devices',
            transformResponse: (response: ApiResponse<StorageDevice[]>) => response.data || [],
            providesTags: ['StorageDevice'],
        }),
        getStorageDeviceById: builder.query<StorageDevice, number>({
            query: (id) => `storage-devices/${id}`,
            transformResponse: (response: ApiResponse<StorageDevice>) => response.data as StorageDevice,
            providesTags: (result, error, id) => [{ type: 'StorageDevice', id }],
        }),
        createStorageDevice: builder.mutation<StorageDevice, Partial<StorageDevice>>({
            query: (newStorageDevice) => ({
                url: 'storage-devices',
                method: 'POST',
                body: newStorageDevice,
            }),
            transformResponse: (response: ApiResponse<StorageDevice>) => response.data as StorageDevice,
            invalidatesTags: ['StorageDevice'],
        }),
        updateStorageDevice: builder.mutation<StorageDevice, StorageDevice>({
            query: (updatedStorageDevice) => ({
                url: 'storage-devices',
                method: 'PUT',
                body: updatedStorageDevice,
            }),
            transformResponse: (response: ApiResponse<StorageDevice>) => response.data as StorageDevice,
            invalidatesTags: (result, error, { id }) => [{ type: 'StorageDevice', id }],
        }),
        deleteStorageDevice: builder.mutation<void, number>({
            query: (id) => ({
                url: `storage-devices/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'StorageDevice', id }],
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
            invalidatesTags: (result, error, { id }) => [{ type: 'StorageDevice', id }],
        }),
    }),
});

export const {
    useGetStorageDevicesQuery,
    useGetStorageDeviceByIdQuery,
    useCreateStorageDeviceMutation,
    useUpdateStorageDeviceMutation,
    useDeleteStorageDeviceMutation,
    useUploadImageMutation
} = apiStorageDevice;
