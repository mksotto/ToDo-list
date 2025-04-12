import {TConflictError} from "../types/domain/todo-list.ts";

export class ConflictError extends Error {
    code: number = 409;
    reason: TConflictError;

    constructor(reason: string) {
        super();
        this.reason = reason as TConflictError;
    };
}

export const isConflictError = (e: unknown): e is ConflictError => (e as ConflictError).code === 409;