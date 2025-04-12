import {TNotFoundError} from "../types/domain/todo-list.ts";

export class NotFoundError extends Error {
    code: number = 404;
    reason: TNotFoundError;

    constructor(reason: string) {
        super();
        this.reason = reason as TNotFoundError;
    };
}

export const isNotFoundError = (e: unknown): e is NotFoundError => (e as NotFoundError).code === 404;