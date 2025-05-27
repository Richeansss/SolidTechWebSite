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

export interface IAuthResponse {
    data: {
        jwt: string;
    };
    result: {
        status: number;
        message: string;
    };
}


export interface IAuthRequest {
    username: string
    password: string
}

export interface IRegisterResponse {
    message: string
}

export interface IRegisterRequest {
    username: string
    password: string
    role: string
}

export interface IDecodedToken {
    sub: string
    roles: string[]
    iat: number
    exp: number
}

export type DataType = IData | IData2 | IData3
