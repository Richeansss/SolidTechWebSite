import {Brand} from "./Brand";
import {Socket} from "./Socket";
import {Chipset} from "./Chipset";
import {RamType} from "./Ram";

export interface MotherBoard {
    id: number;
    name: string;
    brand: Brand;
    socket: Socket;
    chipset: Chipset;
    typeRam: RamType;
    pci: number;
    amount_of_m2: number;
    hasArgb: boolean;
    imageUrl?: string;
}
