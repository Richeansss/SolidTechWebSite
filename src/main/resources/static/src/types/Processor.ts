import {Brand} from "./Brand";
import {Socket} from "./Socket";

export interface Processor {
    id?: number; // ID процессора, может быть undefined при создании нового
    name: string; // Название процессора
    brand: Brand
    socket: Socket;
    core: number; // Количество ядер
    threads: number; // Количество потоков
    turbo_bust: number; // Наличие турбо-буста (1 или 0)
    tdp: number;
    imageUrl?: string;  // Добавляем поле для хранения URL изображения
}
