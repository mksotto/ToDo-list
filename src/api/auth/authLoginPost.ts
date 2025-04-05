import {AuthLoginPost} from "../../types/domain/todo-list.ts";
import {authRequestService} from "./base.ts";

export const authLoginPost = (data: AuthLoginPost) => authRequestService({
    url: '/login',
    method: 'POST',
    data,
});