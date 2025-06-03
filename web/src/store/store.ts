import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { caseApi } from './api/caseApi.ts';
import { brandApi } from './api/brandApi.ts';
import { lightTypeApi } from './api/lightTypeApi.ts';
import { coolerApi} from "./api/coolerApi.ts";
import { powerSupplyApi } from "./api/powerSupplyApi.ts";
import { storageDeviceApi} from "./api/storageDeviceApi.ts";
import {ramApi} from "./api/ramApi.ts";
import {videocardApi} from "./api/videocardApi.ts";
import {processorApi} from "./api/processorApi.ts";
import {socketApi} from "./api/socketApi.ts";
import {chipsetApi} from "./api/chipsetApi.ts";
import {motherboardApi} from "./api/motherboardApi.ts";
import {pcApi} from "./api/pcApi.ts";
import {pcComponentApi} from "./api/pcComponentApi.ts";
import authReducer from './slice/authSlice';
import {authApi} from "./api/authApi.ts"; // путь к твоему authSlice


// Объединение редьюсеров
const rootReducer = combineReducers({
    [caseApi.reducerPath]: caseApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [lightTypeApi.reducerPath]: lightTypeApi.reducer,
    auth: authReducer,[authApi.reducerPath]: authApi.reducer,
    [coolerApi.reducerPath]: coolerApi.reducer,
    [powerSupplyApi.reducerPath]: powerSupplyApi.reducer,
    [storageDeviceApi.reducerPath]: storageDeviceApi.reducer,
    [ramApi.reducerPath]: ramApi.reducer,
    [videocardApi.reducerPath]: videocardApi.reducer,
    [processorApi.reducerPath]: processorApi.reducer,
    [socketApi.reducerPath]: socketApi.reducer,
    [chipsetApi.reducerPath]: chipsetApi.reducer,
    [motherboardApi.reducerPath]: motherboardApi.reducer,
    [pcApi.reducerPath]: pcApi.reducer,
    [pcComponentApi.reducerPath]: pcComponentApi.reducer
});

export const store = configureStore({
    reducer: rootReducer,  // Используем rootReducer, который объединяет редьюсеры
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(caseApi.middleware)  // Добавляем middleware для caseApi
            .concat(brandApi.middleware)
            .concat(lightTypeApi.middleware)
            .concat(coolerApi.middleware)// Добавляем middleware для apiBra
            .concat(powerSupplyApi.middleware)
            .concat(storageDeviceApi.middleware)
            .concat(ramApi.middleware)
            .concat(videocardApi.middleware)
            .concat(processorApi.middleware)
            .concat(socketApi.middleware)
            .concat(chipsetApi.middleware)
            .concat(motherboardApi.middleware)
            .concat(pcApi.middleware)
            .concat(pcComponentApi.middleware)
});

// Типы для Store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
