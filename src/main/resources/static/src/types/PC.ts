import { PowerSupply } from "./PowerSupply";
import { MotherBoard } from "./MotherBoard";
import { Processor } from "./Processor";
import { Ram } from "./Ram";
import { Cooler } from "./Cooler";
import { Case } from "./Case";
import { Videocard } from "./VideoCard";
import { StorageDevice } from "./StorageDevice";
import {PCComponent} from "./PCComponent";

export interface PC {
    id: number;
    motherBoard: MotherBoard;
    motherBoardWarranty: number | null;
    motherBoardStore: TypeStore;

    processor: Processor;
    processorWarranty: number | null;
    processorStore: TypeStore;

    ram: Ram;
    ramWarranty: number | null;
    ramStore: TypeStore;

    cooler: Cooler;
    coolerWarranty: number | null;
    coolerStore: TypeStore;

    casePc: Case;
    caseWarranty: number | null;
    caseStore: TypeStore;

    videocard: Videocard;
    videocardWarranty: number | null;
    videocardStore: TypeStore;

    storageDevice: StorageDevice;
    storageDeviceWarranty: number | null;
    storageDeviceStore: TypeStore;

    powerSupply: PowerSupply;
    powerSupplyWarranty: number | null;
    powerSupplyStore: TypeStore;

    price: number;
    components?: PCComponent[]; // добавляем массив компонентов

    imageUrl?: string;
    imagesUrl: string[];  // Добавляем поле для хранения URL изображения
}

export enum TypeStore {
    Avito = "Avito",
    Ozon = "Ozon",
    DNS = "DNS",
    OnlineTrade = "OnlineTrade",
    Aliexpress = "Aliexpress",
    Citilink = "Citilink"
}
