import {TBadRequestError} from './../types/domain/todo-list.ts'

export class BadRequestError extends Error {
    code: number = 400;
    reason: TBadRequestError;

    constructor(reason: string) {
        super();
        this.reason = reason as TBadRequestError;
    };
}

export const isBadRequestError = (e: unknown): e is BadRequestError => (e as BadRequestError).code === 400;