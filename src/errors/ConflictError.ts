export class ConflictError extends Error {
    code: number = 409;

    constructor(message: string) {
        super(message);
    };
}

export const isConflictError = (e: unknown): e is ConflictError => (e as ConflictError).code === 409;