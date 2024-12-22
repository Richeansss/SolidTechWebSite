interface ErrorResponse {
    code: number;
    description: string;
}

export interface ApiResponse<T> {
    response: ErrorResponse;   // Добавляем error response
    data: T | null;
}
