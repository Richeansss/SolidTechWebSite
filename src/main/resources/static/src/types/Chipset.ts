import {Socket} from "./Socket";

export interface Chipset {
    id: number;
    name: string;
    socket: Socket
}