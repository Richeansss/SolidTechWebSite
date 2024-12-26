import {Brand} from "./Brand";

export interface PowerSupply {
    id?: number; // Поле id может быть опциональным, если оно создается сервером
    name: string;
    brand: Brand;
    certificate: number; // Например, 80 (для 80 PLUS)
    power: number; // Мощность блока питания в Вт
    modular: boolean; // Модульный или нет
}