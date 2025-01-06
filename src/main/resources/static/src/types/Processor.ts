import {Brand} from "./Brand";
import {Socket} from "./Socket";
import {RamType} from "./Ram";

export interface Processor {
    id?: number; // ID процессора, может быть undefined при создании нового
    name: string; // Название процессора
    brand: Brand
    socket: Socket;
    typeRam: RamType; // Тип оперативной памяти
    core: number; // Количество ядер
    threads: number; // Количество потоков
    turbo_bust: number; // Наличие турбо-буста (1 или 0)
    url: string; // URL изображения или документации
}
