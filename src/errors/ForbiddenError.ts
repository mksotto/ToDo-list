export class ForbiddenError extends Error {
    code: number = 403;

    constructor(message: string) {
        super(message);
    };
}

export const isForbiddenError = (e: unknown): e is ForbiddenError => (e as ForbiddenError).code === 403;