import React from 'react';
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
import CreateSocket from "../components/socket/CreateSocket";
import SocketTable from "../components/socket/SocketTable";
import CreateChipset from "../components/chipset/CreateChipset";
import ChipsetTable from "../components/chipset/ChipsetTable";
import CreateMotherBoard from "../components/mother-board/CreateMotherBoard";
import MotherBoardTable from "../components/mother-board/MotherBoardTable";
import PCTable from "../components/pc/PCTable";
import CreatePC from "../components/pc/CreatePC";

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
            <CreateProcessor/>
            <ProcessorTable/>
            <CreateSocket/>
            <SocketTable/>
            <CreateChipset/>
            <ChipsetTable/>
            <CreateMotherBoard/>
            <MotherBoardTable/>
            <CreatePC/>
            <PCTable/>
        </div>
    );
};

export default App;