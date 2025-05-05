import { Brand } from "./Brand";
import { LightType } from "./LightType";

export interface Videocard {
    id?: number;
    name: string;
    brand: Brand;
    graphicsClock: number;
    boostClock: number;
    vram: number;
    typeOfVram: string; // Изменил number на string
    memoryBus: number;
    pci: number;
    color: string;
    lightType: LightType;
    imageUrl?: string;  // Добавляем поле для хранения URL изображения
}