export interface IBrand {
    id: number;
    name: string;
}

export interface IMotherBoard {
    id: number;
    name: string;
    brand_id: number;
    soket: string;
    chipset: string;
    type_of_memory: string;
    pci: number;
    amount_of_m2: number;
    url: string;
}