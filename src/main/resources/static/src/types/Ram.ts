import {LightType} from "./LightType";

export enum RamType {
    DDR3 = "DDR3",
    DDR4 = "DDR4",
    DDR5 = "DDR5"
}

export interface Ram {
    id: number;
    name: string;
    brand: {
        id: number;
        name: string;
    };
    amountRam: number; // Объем памяти в ГБ
    typeRam: RamType;  // Тип памяти (например, DDR4, DDR5)
    jdek: number;     // Частота (например, 3200 МГц)
    timing: number;   // Тайминги
    lightType: LightType; // Тип подсветки
}

