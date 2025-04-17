import {BadRequestError} from "../errors/BadRequestError.ts";
import {UnauthorizedError} from "../errors/UnauthorizedError.ts";
import {ForbiddenError} from "../errors/ForbiddenError.ts";
import {NotFoundError} from "../errors/NotFoundError.ts";
import {ConflictError} from "../errors/ConflictError.ts";
import {InternalServerError} from "../errors/InternalServerError.ts";

export const errorHandler = async (r: Response) => {
    switch (r.status) {
        case 400:
            throw new BadRequestError(await r.text());
        case 401:
            throw new UnauthorizedError(await r.text());
        case 403:
            throw new ForbiddenError(await r.text());
        case 404:
            throw new NotFoundError(await r.text());
        case 409:
            throw new ConflictError(await r.text());
        case 500:
            throw new InternalServerError(await r.text());
        default:
            throw new Error(`Unknown server error: ${r.status}`);
    }
};