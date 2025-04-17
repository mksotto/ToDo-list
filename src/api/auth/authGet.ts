import {authRequestService} from "./base.ts";
import {User} from "../../types/domain/todo-list.ts";

export const authGet = () => authRequestService<User>({
    url: '',
    method: 'GET',
});