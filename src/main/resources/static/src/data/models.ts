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

export interface IdName {
    id: number;
    name: string;
}

export interface IGame {
    id: number;
    name: string;
}

export interface IFPSBuild {
    id: number;
    gameFPSCounts: IGameFPSCount[];
}

export interface IGameFPSCount {
    id: number;
    fpsBuild: IFPSBuild;
    game: IGame;
    fpsCount: number;
}

export interface IProcessor {
    id: number;
    name: string;
    brand: IBrand;
    soket: ISoket;
    type_of_memory: string;
    core: number;
    threads: number;
    turbo_bust:number;
    url:string
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