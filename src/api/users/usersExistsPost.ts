import {usersRequestService} from "./base.ts";
import {UsersExistsPost, UsersExistsPostResponse} from "../../types/domain/todo-list.ts";

export const usersExistsPost = (data: UsersExistsPost) => usersRequestService<UsersExistsPostResponse>({
    url: '/exists',
    method: 'POST',
    data,
})