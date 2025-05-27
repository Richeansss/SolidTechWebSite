export interface CustomError = {
    data?: {
        response?: {
            code?: string;
            description?: string;
        };
    };
};