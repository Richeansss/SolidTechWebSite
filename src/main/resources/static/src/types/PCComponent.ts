import {PC} from "./PC";

export enum ComponentType {
    MOTHERBOARD = "MOTHERBOARD",
    PROCESSOR = "PROCESSOR",
    RAM = "RAM",
    STORAGE = "STORAGE",
    GPU = "GPU",
    POWER_SUPPLY = "POWER_SUPPLY",
    COOLER = "COOLER",
    CASE = "CASE",
}

export enum TypeStore {
    AVITO = "AVITO",
    OZON = "OZON",
    DNS = "DNS",
    ONLINETRADE = "ONLINETRADE",
    ALIEXPRESS = "ALIEXPRESS",
    CITILINK = "CITILINK",
}


export interface PCComponent {
    id: number;
    pc?: PC | null; // Может быть null, если на складе
    componentType ?: ComponentType;
    componentId: number;
    warrantyMonths: number;
    store: TypeStore;
    details?: {
        name: string;
    };
}


