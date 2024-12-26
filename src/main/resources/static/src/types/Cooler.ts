import {LightType} from "./LightType";
import {Brand} from "./Brand";

export interface Cooler {
    id: number;
    name: string;
    brand?: { id: number; name: string };
    tdp: number;
    funConnector: number; // Поле fun_connector переименовано в camelCase для консистентности
    lightType?: { id: number, name: string };
}