import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiCase } from './api/apiCase';
import { apiBrand } from './api/apiBrand';
import { apiLightType } from './api/apiLighttype';
import { apiCooler} from "./api/apiCooler";
import { apiPowerSupply } from "./api/apiPowerSupply";
import { apiStorageDevice} from "./api/apiStorageDevice";
import {apiRam} from "./api/apiRam";
import {apiVideocard} from "./api/apiVideoCard";
import {apiProcessor} from "./api/apiProcessor";
import {apiSocket} from "./api/apiSocket";
import {apiChipset} from "./api/apiChipset";
import {apiMotherBoard} from "./api/apiMotherBoard";
import {apiPC} from "./api/apiPC";

// Объединение редьюсеров
const rootReducer = combineReducers({
    [apiCase.reducerPath]: apiCase.reducer,
    [apiBrand.reducerPath]: apiBrand.reducer,
    [apiLightType.reducerPath]: apiLightType.reducer,
    [apiCooler.reducerPath]: apiCooler.reducer,
    [apiPowerSupply.reducerPath]: apiPowerSupply.reducer,
    [apiStorageDevice.reducerPath]: apiStorageDevice.reducer,
    [apiRam.reducerPath]: apiRam.reducer,
    [apiVideocard.reducerPath]: apiVideocard.reducer,
    [apiProcessor.reducerPath]: apiProcessor.reducer,
    [apiSocket.reducerPath]: apiSocket.reducer,
    [apiChipset.reducerPath]: apiChipset.reducer,
    [apiMotherBoard.reducerPath]: apiMotherBoard.reducer,
    [apiPC.reducerPath]: apiPC.reducer
});

export const store = configureStore({
    reducer: rootReducer,  // Используем rootReducer, который объединяет редьюсеры
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiCase.middleware)  // Добавляем middleware для apiCase
            .concat(apiBrand.middleware)
            .concat(apiLightType.middleware)
            .concat(apiCooler.middleware)// Добавляем middleware для apiBra
            .concat(apiPowerSupply.middleware)
            .concat(apiStorageDevice.middleware)
            .concat(apiRam.middleware)
            .concat(apiVideocard.middleware)
            .concat(apiProcessor.middleware)
            .concat(apiSocket.middleware)
            .concat(apiChipset.middleware)
            .concat(apiMotherBoard.middleware)
            .concat(apiPC.middleware)
});

// Типы для Store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
