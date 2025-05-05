import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store/store";

import MainComponentPage from "./pages/MainComponentPage";
import SubComponentPage from "./pages/SubComponentPage";
import PCDetails from "./pages/PCDetails";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<MainComponentPage />} />
                <Route path="/sub" element={<SubComponentPage />} />
                <Route path="/pc/:id" element={<PCDetails />} />
            </Routes>
        </Router>
    </Provider>
);