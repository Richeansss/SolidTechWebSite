import {PCComponent} from "./PCComponent";

export interface PC {
    id: number;
    motherBoard: PCComponent;
    processor: PCComponent;
    ram: PCComponent;
    cooler: PCComponent;
    case_pc: PCComponent;
    videocard: PCComponent;
    storageDevice: PCComponent;
    powerSupply: PCComponent;
    price: number;
    imageUrl: string;
    isForSale: boolean;
    imagesUrl: string[];  // Добавляем поле для хранения URL изображения
}
