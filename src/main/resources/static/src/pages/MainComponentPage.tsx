import React from 'react';
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
import VideocardList from "../components/video-card/VideocardList";  // Подключаем файл со стилями

const App: React.FC = () => {
        return (
            <div>
                    <h1>Магазин компьютеров</h1>
                    <VideocardList/>
                    <Tabs>
                            <TabList className="tab-list">
                                    <Tab className="tab">Охлаждения</Tab>
                                    <Tab className="tab">Блоки питания</Tab>
                                    <Tab className="tab">Устройства хранения</Tab>
                                    <Tab className="tab">Оперативная память</Tab>
                                    <Tab className="tab">Видеокарты</Tab>
                                    <Tab className="tab">Процессоры</Tab>
                                    <Tab className="tab">Материнские платы</Tab>
                                    <Tab className="tab">ПК</Tab>
                            </TabList>

                            <TabPanel className="tab-panel">
                                    <CreateCooler />
                                    <CoolerTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreatePowerSupply />
                                    <PowerSuppliesTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateStorageDevice />
                                    <StorageDevicesTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateRam />
                                    <RamTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateVidoCard />
                                    <VideoCardTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateProcessor />
                                    <ProcessorTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreateMotherBoard />
                                    <MotherBoardTable />
                            </TabPanel>
                            <TabPanel className="tab-panel">
                                    <CreatePC />
                                    <PCTable />
                            </TabPanel>
                    </Tabs>
            </div>
        );
};

export default App;
