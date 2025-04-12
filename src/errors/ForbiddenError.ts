import {TForbiddenError} from "../types/domain/todo-list.ts";

export class ForbiddenError extends Error {
    code: number = 403;
    reason: TForbiddenError;

    constructor(reason: string) {
        super();
        this.reason = reason as TForbiddenError;
    };
}

export const isForbiddenError = (e: unknown): e is ForbiddenError => (e as ForbiddenError).code === 403;