import {authRequestService} from "./base.ts";
import {AuthSignupPost} from "../../types/domain/todo-list.ts";

export const authSignupPost = (data: AuthSignupPost) => authRequestService({
    url: '/signup',
    method: 'POST',
    data,
});