import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from "./router/AppRouter.tsx";
import {MainLayout} from "./containers/MainLayout/MainLayout.tsx";

function App() {

    return (
        <Router>
            <MainLayout>
                <AppRouter />
            </MainLayout>
        </Router>
    );
}

export default App;
