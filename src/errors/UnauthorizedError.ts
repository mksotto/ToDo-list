export class UnauthorizedError extends Error {
    code: number = 401;

    constructor(message: string) {
        super(message);
    };
}

export const isUnauthorizedError = (e: unknown): e is UnauthorizedError => (e as UnauthorizedError).code === 401;