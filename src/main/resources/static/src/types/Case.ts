import {Brand} from "./Brand";

export interface Case {
    id: number;
    name: string;
    brand: Brand;
    formFactor: string;
    amountFun?: number;
    lightType?: { id: number, name: string };
    funConnector?: number;
    color: string;
    glassType: string;
    imageUrl?: string;
    [key: string]: any; // Для добавления дополнительных полей, если потребуется
}