import React, { useState, useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import CreateCooler from "../components/cooler/CreateCooler";
import CoolerTable from "../components/cooler/CoolerTable";
import CreatePowerSupply from "../components/power-supply/CreatePowerSupply";
import PowerSuppliesTable from "../components/power-supply/PowerSupplyTable";
import CreateStorageDevice from "../components/storage-device/CreateStorageDevice";
import StorageDevicesTable from "../components/storage-device/StorageDevicesTable";
import RamTable from "../components/ram/RamTable";
import CreateRam from "../components/ram/CreateRam";
import CreateVidoCard from "../components/video-card/CreateVideoCard";
import VideoCardTable from "../components/video-card/VideoCardTable";
import ProcessorTable from "../components/processor/ProcessorTable";
import CreateProcessor from "../components/processor/CreateProcessor";
import CreateMotherBoard from "../components/mother-board/CreateMotherBoard";
import MotherBoardTable from "../components/mother-board/MotherBoardTable";
import PCTable from "../components/pc/PCTable";
import CreatePC from "../components/pc/CreatePC";

import './Page.css';
import VideocardList from "../components/video-card/VideocardList";
import CreateCase from "../components/case/CreateCase";
import CasesTable from "../components/case/CasesTable";

const App: React.FC = () => {
        // Храним индекс активной вкладки в useState
        const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
        // Используем useRef для сохранения текущего индекса вне рендера
        const activeTabRef = useRef<number>(0);

        const handleTabChange = (index: number) => {
                setActiveTabIndex(index);
                activeTabRef.current = index; // Сохраняем в ref
        };

        return (
            <div>
                    <h1>Магазин компьютеров</h1>
                    <VideocardList />
                    <Tabs
                        selectedIndex={activeTabRef.current} // Устанавливаем сохраненное значение
                        onSelect={handleTabChange}
                    >
                            <TabList className="tab-list">
                                    <Tab className="tab">ПК</Tab>
                                    <Tab className="tab">Материнские платы</Tab>
                                    <Tab className="tab">Процессоры</Tab>
                                    <Tab className="tab">Видеокарты</Tab>
                                    <Tab className="tab">Оперативная память</Tab>
                                    <Tab className="tab">Блоки питания</Tab>
                                    <Tab className="tab">Корпус</Tab>
                                    <Tab className="tab">Охлаждения</Tab>
                                    <Tab className="tab">Устройства хранения</Tab>
                            </TabList>

                            <TabPanel className="tab-panel">
                                    <CreatePC />
                                    <PCTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateMotherBoard />
                                    <MotherBoardTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateProcessor />
                                    <ProcessorTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateVidoCard />
                                    <VideoCardTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateRam />
                                    <RamTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreatePowerSupply />
                                    <PowerSuppliesTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateCase />
                                    <CasesTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateCooler />
                                    <CoolerTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateStorageDevice />
                                    <StorageDevicesTable />
                            </TabPanel>

                    </Tabs>
            </div>
        );
};

export default App;
