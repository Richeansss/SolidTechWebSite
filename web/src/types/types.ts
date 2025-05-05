export interface IData {
    name: string
    age: number
    position: string
}

export interface IData2 {
    name: string
    age: number
    salary: number
    position: string
}

export interface IData3 {
    name: string
    salary: number
    position: string
}

export type DataType = IData | IData2 | IData3
