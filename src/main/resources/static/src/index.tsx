import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store'; // Импортируем store из файла, где вы его конфигурировали
import App from './App';
import CasePage from "./pages/CasePage";
import {Brand} from "./components/Brand";

// Оборачиваем приложение в <Provider>
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}> {/* Провайдер для контекста Redux */}
        <CasePage />
    </Provider>
);
