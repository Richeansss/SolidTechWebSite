import React from 'react';
import CreateCooler from "../components/cooler/CreateCooler";
import CoolerTable from "../components/cooler/CoolerTable";
import CreatePowerSupply from "../components/power-supply/CreatePowerSupply";
import PowerSuppliesTable from "../components/power-supply/PowerSupplyTable";
import CreateStorageDevice from "../components/storage-device/CreateStorageDevice";
import StorageDevicesTable from "../components/storage-device/StorageDevicesTable";
import RamTable from "../components/ram/RamTable";
import CreateRam from "../components/ram/CreateRam";
import CreateVidoCard from "../components/video-card/CreateVidoCard";
import VideoCardTable from "../components/video-card/VideoCardTable";

const App: React.FC = () => {
    return (
        <div>
            <h1>Магазин компьютеров</h1>
            <CreateCooler/>
            <CoolerTable/>
            <CreatePowerSupply/>
            <PowerSuppliesTable/>
            <CreateStorageDevice/>
            <StorageDevicesTable />
            <CreateRam/>
            <RamTable/>
            <CreateVidoCard/>
            <VideoCardTable/>
        </div>
    );
};

export default App;