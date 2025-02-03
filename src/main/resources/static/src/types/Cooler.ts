import {LightType} from "./LightType";
import {Brand} from "./Brand";

export interface Cooler {
    id: number;
    name: string;
    brand: Brand;
    tdp: number;
    funSize: string;
    funConnector: number; // Поле fun_connector переименовано в camelCase для консистентности
    lightType?: LightType; // lightType может быть необязательным, так как он не всегда указывается
    imageUrl?: string;
}