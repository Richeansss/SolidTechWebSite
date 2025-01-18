import {Brand} from "./Brand";

export enum StorageType {
    HDD = "HDD",
    SSD = "SSD",
}

export enum InterfaceType {
    SATA = "SATA",
    USB = "USB",
    SATA_III = "SATA_III",
    PCIE_4_0 = "PCIE_4_0",
    PCIE_3_0 = "PCIE_3_0",
}

export enum FormFactor {
    PCIE_CARD = "PCIE_CARD",
    FORM_2_5 = "FORM_2_5",
    FORM_3_5 = "FORM_3_5",
    M_2 = "M_2",
}

export interface StorageDevice {
    id: number;
    name: string;
    brand: Brand;
    type: StorageType; // Например, SSD, HDD
    capacityGb: number;
    formFactor: FormFactor; // Например, FORM_2_5, M_2 и т.д.
    interfaceType: InterfaceType; // Например, SATA_III, NVMe и т.д.
    readSpeedMbps: number; // Скорость чтения в мегабайтах в секунду
    writeSpeedMbps: number; // Скорость записи в мегабайтах в секунду
    imageUrl?: string;  // Добавляем поле для хранения URL изображения
}

