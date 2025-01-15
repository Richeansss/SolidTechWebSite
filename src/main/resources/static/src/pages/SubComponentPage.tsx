import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import CreateSocket from "../components/socket/CreateSocket";
import SocketTable from "../components/socket/SocketTable";
import CreateChipset from "../components/chipset/CreateChipset";
import ChipsetTable from "../components/chipset/ChipsetTable";


import './Page.css';
import CreateCase from "../components/case/CreateCase";
import CasesTable from "../components/case/CasesTable";
import CreateBrand from "../components/brand/CreateBrand";
import BrandTable from "../components/brand/BrandTable";
import CrateLightTable from "../components/light-type/CrateLightTable";
import LightTypeTable from "../components/light-type/LightTypeTable";  // Подключаем файл со стилями

const App: React.FC = () => {
    return (
        <div>
            <Tabs>
                <TabList className="tab-list">
                    <Tab className="tab">Корпус</Tab>
                    <Tab className="tab">Бренд</Tab>
                    <Tab className="tab">Тип подсветки</Tab>
                    <Tab className="tab">Сокет</Tab>
                    <Tab className="tab">Чипсет</Tab>
                </TabList>

                <TabPanel className="tab-panel">
                    <CreateCase />
                    <CasesTable />
                </TabPanel>
                <TabPanel className="tab-panel">
                    <CreateBrand />
                    <BrandTable />
                </TabPanel>
                <TabPanel className="tab-panel">
                    <CrateLightTable/>
                    <LightTypeTable/>
                </TabPanel>
                <TabPanel className="tab-panel">
                    <CreateSocket />
                    <SocketTable />
                </TabPanel>
                <TabPanel className="tab-panel">
                    <CreateChipset />
                    <ChipsetTable />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default App;
