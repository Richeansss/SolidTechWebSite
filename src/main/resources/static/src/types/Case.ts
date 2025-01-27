import {Brand} from "./Brand";

export interface Case {
    id: number;
    name: string;
    brand: Brand;
    formFactor?: number;
    amountFun?: number;
    lightType?: { id: number, name: string };
    funConnector?: number;
    color?: number;
    glassType?: number;
    imageUrl?: string;
    [key: string]: any; // Для добавления дополнительных полей, если потребуется
}