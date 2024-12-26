import React from 'react';
import CreateCooler from "../components/cooler/CreateCooler";
import CoolerTable from "../components/cooler/CoolerTable";

const App: React.FC = () => {
    return (
        <div>
            <h1>Магазин компьютеров</h1>
            <CreateCooler/>
            <CoolerTable/>
        </div>
    );
};

export default App;