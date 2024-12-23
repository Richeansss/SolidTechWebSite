import React from 'react';
import CreateCase from '../components/case/CreateCase';
import CreateBrand from "../components/brand/CreateBrand";
import CasesTable from "../components/case/CasesTable";
import BrandTable from "../components/brand/BrandTable";
import CrateLightTable from "../components/light-type/CrateLightTable";
import LightTypeTable from "../components/light-type/LightTypeTable";

const App: React.FC = () => {
    return (
        <div>
            <h1>Магазин компьютеров</h1>
            <CreateCase />
            <CasesTable />
            <CreateBrand />
            <BrandTable />
            <CrateLightTable/>
            <LightTypeTable/>
        </div>
    );
};

export default App;
