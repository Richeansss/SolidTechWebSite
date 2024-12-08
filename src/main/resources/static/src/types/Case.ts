export interface Case {
    id: number;
    name: string;
    brand?: { id: number; name: string };
    formFactor?: number;
    amountFun?: number;
    lightType?: number;
    funConnector?: number;
    color?: number;
    glassType?: number;
    [key: string]: any; // Для добавления дополнительных полей, если потребуется
}