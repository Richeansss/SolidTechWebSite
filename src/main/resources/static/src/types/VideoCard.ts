import {Brand} from "./Brand";
import {LightType} from "./LightType";

export interface Videocard {
    id?: number;
    name: string;
    brand: Brand;
    vram: number;
    typeOfVram: number;
    memoryBus: number;
    pci: number;
    color: number;
    lightType: LightType;
}