import {authRequestService} from "./base.ts";
import {AuthPatch} from "../../types/domain/todo-list.ts";

export const authPatch = (data: AuthPatch) => authRequestService({
    url: '',
    method: 'PATCH',
    data,
});