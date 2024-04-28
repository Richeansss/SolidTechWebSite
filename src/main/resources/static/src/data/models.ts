export interface IBrand {
    id: number;
    name: string;
}

export interface ISoket {
    id: number;
    name: string;
}

export interface IChipset {
    id: number;
    name: string;
}

export interface IdNameTable {
    id: number;
    name: string;
}

export interface IMotherBoard {
    id: number;
    name: string;
    type_of_memory: string;
    pci: number;
    amount_of_m2: number;
    url: string;
    brand: IBrand;
    soket: ISoket;
    chipset: IChipset;
}