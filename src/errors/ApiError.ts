export class ApiError extends Error {
    type = 'ApiError';
    code: number;
    message: string;

    constructor(code: number, message: string) {
        super();
        this.code = code;
        this.message = message;
    };
}

export const isApiError = (e: unknown): e is ApiError => (e as ApiError).type === 'ApiError';