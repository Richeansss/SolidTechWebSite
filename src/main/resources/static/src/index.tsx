import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store'; // Импортируем store из файла, где вы его конфигурировали
import CasePage from "./pages/CasePage";
import CoolerPage from "./pages/CoolerPage";

// Оборачиваем приложение в <Provider>
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}> {/* Провайдер для контекста Redux */}
        <CasePage />
        <CoolerPage/>
    </Provider>
);
