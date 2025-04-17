import {TInternalServerError} from "../types/domain/todo-list.ts";

export class InternalServerError extends Error {
    code: number = 500;
    reason: TInternalServerError;

    constructor(reason: string) {
        super();
        this.reason = reason as TInternalServerError;
    };
}

export const isInternalServerError = (e: unknown): e is InternalServerError => (e as InternalServerError).code === 500;