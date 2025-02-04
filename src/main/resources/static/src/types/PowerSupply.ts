import {Brand} from "./Brand";

export interface PowerSupply {
    id?: number; // Поле id может быть опциональным, если оно создается сервером
    name: string;
    brand: Brand;
    certificate: string; // Например, 80 (для 80 PLUS)
    power: number; // Мощность блока питания в Вт
    modular: boolean; // Модульный или нет
    imageUrl?: string;  // Добавляем поле для хранения URL изображения
}