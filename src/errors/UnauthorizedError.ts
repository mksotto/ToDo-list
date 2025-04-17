import {TUnauthorizedError} from "../types/domain/todo-list.ts";

export class UnauthorizedError extends Error {
    code: number = 401;
    reason: TUnauthorizedError;

    constructor(reason: string) {
        super();
        this.reason = reason as TUnauthorizedError;
    };
}

export const isUnauthorizedError = (e: unknown): e is UnauthorizedError => (e as UnauthorizedError).code === 401;