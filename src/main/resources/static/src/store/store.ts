import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiCase } from './api/apiCase';
import { apiBrand } from './api/apiBrand';
import { apiLightType } from './api/apiLighttype';
import { apiCooler} from "./api/apiCooler";

// Объединение редьюсеров
const rootReducer = combineReducers({
    [apiCase.reducerPath]: apiCase.reducer,
    [apiBrand.reducerPath]: apiBrand.reducer,
    [apiLightType.reducerPath]: apiLightType.reducer,
    [apiCooler.reducerPath]: apiCooler.reducer

});

export const store = configureStore({
    reducer: rootReducer,  // Используем rootReducer, который объединяет редьюсеры
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiCase.middleware)  // Добавляем middleware для apiCase
            .concat(apiBrand.middleware)
            .concat(apiLightType.middleware)
            .concat(apiCooler.middleware)// Добавляем middleware для apiBra
});

// Типы для Store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
