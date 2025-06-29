import React, { useState, useCallback, useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import CreateCooler from "../../components/cooler/CreateCooler";
import CoolerTable from "../../components/cooler/CoolerTable";
import CreatePowerSupply from "../../components/power-supply/CreatePowerSupply";
import PowerSuppliesTable from "../../components/power-supply/PowerSupplyTable";
import CreateStorageDevice from "../../components/storage-device/CreateStorageDevice";
import StorageDevicesTable from "../../components/storage-device/StorageDevicesTable";
import RamTable from "../../components/ram/RamTable";
import CreateRam from "../../components/ram/CreateRam";
import CreateVidoCard from "../../components/video-card/CreateVideoCard";
import VideoCardTable from "../../components/video-card/VideoCardTable";
import ProcessorTable from "../../components/processor/ProcessorTable";
import CreateProcessor from "../../components/processor/CreateProcessor";
import CreateMotherBoard from "../../components/mother-board/CreateMotherBoard";
import MotherBoardTable from "../../components/mother-board/MotherBoardTable";
import PCTable from "../../components/pc/PCTable";
import CreatePC from "../../components/pc/CreatePC";
import CreateCase from "../../components/case/CreateCase";
import CasesTable from "../../components/case/CasesTable";

import styles from './Page.module.css';
import BarChart from "../../components/chart/BarChart";
import CreatePCComponent from "../../components/PCComponent/CreatePCComponent";

export const AdminDashboard: React.FC = () => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(() => {
        const savedIndex = sessionStorage.getItem('activeTabIndex');
        return savedIndex ? Number(savedIndex) : 0;
    });

    const labels = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май'];
    const data = [65, 59, 80, 81, 56];

    const handleTabChange = useCallback((index: number) => {
        setActiveTabIndex(index);
        sessionStorage.setItem('activeTabIndex', index.toString());
    }, []);

    const tabsData = useMemo(() => [
        { label: "ПК", createComponent: <CreatePC />, tableComponent: <PCTable /> },
        { label: "Материнские платы", createComponent: <CreateMotherBoard />, tableComponent: <MotherBoardTable /> },
        { label: "Процессоры", createComponent: <CreateProcessor />, tableComponent: <ProcessorTable /> },
        { label: "Видеокарты", createComponent: <CreateVidoCard />, tableComponent: <VideoCardTable /> },
        { label: "Оперативная память", createComponent: <CreateRam />, tableComponent: <RamTable /> },
        { label: "Блоки питания", createComponent: <CreatePowerSupply />, tableComponent: <PowerSuppliesTable /> },
        { label: "Корпус", createComponent: <CreateCase />, tableComponent: <CasesTable /> },
        { label: "Охлаждения", createComponent: <CreateCooler />, tableComponent: <CoolerTable /> },
        { label: "Устройства хранения", createComponent: <CreateStorageDevice />, tableComponent: <StorageDevicesTable /> }
    ], []);

    return (
        <div>
            <Tabs selectedIndex={activeTabIndex} onSelect={handleTabChange}>
                <TabList className={styles.tabList}>
                    {tabsData.map((tab, index) => (
                        <Tab key={index} className={styles.tab}>{tab.label}</Tab>
                    ))}
                </TabList>

                {tabsData.map((tab, index) => (
                    <TabPanel key={index} className={styles.tabPanel}>
                        {tab.createComponent}
                        {tab.tableComponent}
                    </TabPanel>
                ))}
            </Tabs>
            <div>
                <CreatePCComponent />
                <h1>Моя столбчатая диаграмма</h1>
                <BarChart labels={labels} data={data} />
            </div>
        </div>
    );
};
